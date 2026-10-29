export type Song = {
    id: string;
    title: string;
    artist?: string;
    durationMs?: number;
    trackNumber?: string;
    year?: number;
    coverUrl?: string;
};

export type Album = {
    id: string;
    title: string;
    artist: string;
    year?: number;
    durationMs?: string;
    coverUrl?: string;
    tracks?: Song[];
};

export type Playlist = {
    id: string;
    name: string;
    createdAt: number;
    songs: Song[];
}

export type Filters = {
    genre: string;
    type: string;
    category: string;
    duration: string,
}

export type SearchMode = "albums" | "songs"
