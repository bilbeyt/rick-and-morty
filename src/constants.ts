import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query CharacterList($page: Int){
    characters(page: $page) {
      results {
        id
        name
        species
        origin{
          name
        }
        location {
          name
        }
      }
      info{next prev count}
    }
  }
`

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character (id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {id, name}
      location {id, name}
      image
      episode {id, name}
      created
    }
  }
`

export const GET_EPISODE = gql`
  query Episode($id: ID!) {
    episode (id: $id) {
      id
      name
      air_date
      episode
      characters {id name}
      created
    }
  }
`

export const GET_EPISODES = gql`
  query EpisodeList($page: Int){
    episodes(page: $page) {
      results {
        id
        name
        air_date
        episode
      }
      info{next prev count}
    }
  }
`

export const GET_LOCATION = gql`
  query Location($id: ID!) {
    location (id: $id) {
      id
      name
      type
      dimension
      residents {id name}
      created
    }
  }
`

export const GET_LOCATIONS = gql`
  query LocationList($page: Int){
    locations(page: $page) {
      results {
        id
        name
        type
        dimension
      }
      info{next prev count}
    }
  }
`