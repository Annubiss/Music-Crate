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

