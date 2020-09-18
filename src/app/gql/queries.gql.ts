import gql from 'graphql-tag';

export const userExists = gql` query userExists(
    $emailOrPhone: String!
) {
    userExists(emailOrPhone: $emailOrPhone)
}`;