import { gql } from "@apollo/client";

export const QUERY_USER = gql`
query user {
  user {
    _id
    email
    events {
      _id
      createdAt
      end
      start
      title
    }
    username
  }
}

`;

export const QUERY_EVENT = gql`
query event($eventId: ID!) {
  event(eventId: $eventId) {
    _id
    createdAt
    end
    start
    title
  }
}
`;
