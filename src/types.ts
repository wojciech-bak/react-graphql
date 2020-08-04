export type Artist = {
    name: string,
    id: string
}

export type ArtistsListProps = {
    artists: Artist[]
}

export type SearchResponse = {
    search: {
        artists: {
            nodes: Artist[]
        }
    }
}