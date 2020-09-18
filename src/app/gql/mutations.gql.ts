import gql from 'graphql-tag';

export const signUp = gql`
mutation signup(
  $assignPassword: Boolean,
  $input: UserInput!
) {
  signup(
    assignPassword: $assignPassword,
    input: $input
  ) {
    _id
    }
  }
`;

export const signIn = gql`
mutation signin(
  $remember: Boolean,
  $password: String!,
  $emailOrPhone: String!
) {
  signin(
    remember: $remember,
    password: $password,
    emailOrPhone: $emailOrPhone
  ) {
      token
      user {
        _id
      }
    }
  }
`;

export const verifyUser = gql`
mutation vefiryUser(
  $code: String!,
  $userId: ObjectID!
) {
  vefiryUser(
    code: $code,
    userId: $userId
  ) {
      token,
      user {
          _id
      }
    }
  }
`;