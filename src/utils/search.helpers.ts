import { SearchResponse, Artist } from "../types";
import { gql, ApolloQueryResult } from "@apollo/client";
import { client } from "../App";

const SEARCH_ARTISTS = gql`
    query SearchArtists($name: String!) {
        search {
            artists(query: $name) {
                nodes {
                    id,
                    name
                }
            }
        }
    }
`;

export const searchArtists = async (phrase: string): Promise<ApolloQueryResult<SearchResponse>> => {
    return client.query<SearchResponse>({
        query: SEARCH_ARTISTS,
        variables: { name: phrase }
    })
};

export const extractArtistsFromResponse = (data?: SearchResponse): Artist[] => {
    const artists = data && data.search && data.search.artists && data.search.artists.nodes;
    
    return artists || [];
};