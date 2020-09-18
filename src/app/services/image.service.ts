import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private URI = environment.formerApi;
  private cancelRequest = null;

  constructor() { }

  async uploadImage(image: File) {
    try {
      const formData = new FormData();
      formData.append('file', image);
      const aux = await axios({
        method: "POST",
        url: `${this.URI}/media`,
        data: formData,
        headers: {
          "Content-Type": "application/json"
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      return aux.data;
    } catch (err) {
      throw err;
    }
  }
}
