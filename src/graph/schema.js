export default `

    type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    events: [Event!]!
  }

  type Event {
    id: Int!
    name: String
    date: String!
    picture: String
    createdBy: String!
    user: User!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }
`;
