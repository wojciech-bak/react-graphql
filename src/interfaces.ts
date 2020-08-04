import { Artist } from "./types";

export interface SearchProps {
    onSearch: (arr: Artist[]) => void;
}