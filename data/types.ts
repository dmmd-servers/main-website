// Defines data types
export type Anime = {
    begin: string | null;
    comment: string | null;
    end: string | null;
    id: string;
    name: string;
    rating: number | null;
    tags: string[];
    title: string;
    wiki: string | null;
};
export type Game = {
    begin: string | null;
    comment: string | null;
    end: string | null;
    id: string;
    name: string;
    rating: number | null;
    tags: string[];
    title: string;
    users: string[];
    wiki: string | null;    
};
export type Tag = {
    id: string;
    name: string;
};
