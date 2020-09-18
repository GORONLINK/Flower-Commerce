import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URI = environment.formerApi;
  private cancelRequest = null;

  constructor() { }

  // Posts a new User
  // @param phone: string
  // @return User
  async registerUser(phone: string) {
    try {
      const aux = await axios({
        method: "POST",
        url: `${this.URI}/users/TEST`,
        data: phone,
        headers: {
          "Content-Type": "application/json",
          Authorization: "5f4643ce8b67fb6cdc3a6e5b"
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      return aux.data as any;
    } catch (err) {
      throw err;
    }
  }

  // Posts a new User
  // @param phone: string
  // @return User
  async verifyUser(data: {code: string, userId: string}) {
    try {
      const aux = await axios({
        method: "POST",
        url: `${this.URI}/users/verification`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "5f4643ce8b67fb6cdc3a6e5b"
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      return aux.data as any;
    } catch (err) {
      throw err;
    }
  }

}
