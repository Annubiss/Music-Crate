import type { Album, Song } from "../types"

const BASE = "https://musicbrainz.org/ws/2"


type MBReleaseGroup = {
    id: string;
    title: string;
    "first-release-date": string;
    "artist-credit"?: {name: string }[];
};

type MBTrack = {
    id: string;
    number: string;
    title: string;
    length?: number;
}

type MBMedium = {
    tracks?: MBTrack[];
}

type MBRelease = {
    media?: MBMedium[];
}

type MBReleaseResponse = {
    releases: MBRelease[];
}

type MBSSearchResponse = {
    count: number;
    "release-groups": MBReleaseGroup[];
};

type MBRecordingRelease = {
    id: string;
    title: string;
    date?: string;
    "release-group"?: { id: string };
}

type MBRecording = {
    id: string; 
    title: string;
    length?: number;
    "artist-credit"?: { name: string }[];
    releases?: MBRecordingRelease[];
}

type MBRecordingSearchResponse = {
    count: number;
    recordings: MBRecording[];
}

function toAlbum(rg: MBReleaseGroup) : Album {
    return {
        id: rg.id,
        title:rg.title,
        artist: rg["artist-credit"]?.[0]?.name ?? "Unknown artist",
        year: rg["first-release-date"]
            ? Number(rg["first-release-date"].slice(0, 4))
            : undefined,
        coverUrl: `https://coverartarchive.org/release-group/${rg.id}/front-250`,
    };
} 

function toSong(rec: MBRecording) : Song {
    const release = rec.releases?.[0]
    const groupId = release?.["release-group"]?.id

    return {
        id: rec.id,
        title: rec.title,
        artist: rec["artist-credit"]?.[0]?.name ?? "Unknown artist",
        durationMs: rec.length,
        year: release?.date
              ? Number(release.date.slice(0,4))
              : undefined,
        coverUrl: groupId
                  ? `https://coverartarchive.org/release-group/${groupId}/front-250`
                  : undefined,
    }
}

export async function searchAlbums(query: string) : Promise<Album[]> {

    const data = await mbFetch<MBSSearchResponse>(
        `/release-group?query=${encodeURIComponent(query)}&fmt=json&limit=12`
    )

    return data["release-groups"].map(toAlbum)
}

export async function searchSongs(query: string): Promise<Song[]> {
    const data = await mbFetch<MBRecordingSearchResponse>(
        `/recording?query=${encodeURIComponent(query)}&fmt=json&limit=25`
    )
        return data.recordings.map(toSong)
}

export async function getAlbum(id: string) : Promise<Album> {
    const data = await mbFetch<MBReleaseGroup>(
        `/release-group/${id}?fmt=json&inc=artist-credits`
    )

    return toAlbum(data)
}

export async function getTracks(albumId: string) : Promise<Song[]> {
        const data = await mbFetch<MBReleaseResponse>(
            `/release?release-group=${albumId}&fmt=json&inc=recordings&limit=1`
        )

    const release = data.releases[0]
    if (!release) return []

    return (release.media ?? []).flatMap(medium => 
        (medium.tracks ?? []).map(track => ({
            id: track.id,
            title: track.title,
            durationMs: track.length,
            trackNumber: track.number,
        }))
    );
}

let genresCache: string[] | null = null

export async function getGenres(): Promise<string[]> {
    if(genresCache) return genresCache

    const res = await mbRequest("/genre/all?fmt=txt")
    const text = await res.text()

    genresCache = text.split("\n").filter(g => g !== "")

    return genresCache
}

let nextSlot = 0

async function waitForTurn() {
    const now = Date.now()
    const wait = Math.max(0, nextSlot - now)

    nextSlot = Math.max(now, nextSlot) + 1100

    if(wait > 0) {
        await new Promise(resolve => setTimeout(resolve, wait))
    }
}

async function mbRequest(path: string):Promise<Response> {
    await waitForTurn();

    const res = await fetch(`${BASE}${path}`)

    if(!res.ok) {
        throw new Error(`Server responded with ${res.status}`)
    }

    return res
}

async function mbFetch<T>(path: string): Promise<T> {
    const res = await mbRequest(path)
    return res.json()
}