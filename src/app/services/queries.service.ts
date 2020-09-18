import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { userExists } from '../gql/queries.gql';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private apollo: Apollo) { }

  userExists(emailOrPhone: String) {
    try {
      return this.apollo.query({
        query: userExists,
        variables: { emailOrPhone: emailOrPhone }
      });
    } catch (error) {
      throw error;
    }
  }
}