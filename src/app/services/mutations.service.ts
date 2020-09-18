import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { signUp, signIn, verifyUser } from '../gql/mutations.gql';

@Injectable({
  providedIn: 'root'
})
export class MutationsService {

  constructor(private apollo: Apollo) { }

  signUp(assignPassword: boolean, input: any) {
    try {
      return this.apollo.mutate({
        mutation: signUp,
        variables: {
          assignPassword: assignPassword,
          input: input
        }
      })
    } catch (error) {
      throw error;
    }
  }

  signIn(remember: boolean, password: String, emailOrPhone: String) {
    try {
      return this.apollo.mutate({
        mutation: signIn,
        variables: {
          remember: remember,
          password: password,
          emailOrPhone: emailOrPhone
        }
      })
    } catch (error) {
      throw error;
    }
  }

  verifyUser(code: String, userId: String) {
    try {
      return this.apollo.mutate({
        mutation: verifyUser,
        variables: {
          code: code,
          userId: userId
        }
      })
    } catch (error) {
      throw error;
    }
  }

}