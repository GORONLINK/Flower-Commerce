import { Injectable } from '@angular/core';
import axios from "axios";
import { Category } from "../models/category.model";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories: Category[];
  private URI = environment.formerApi;
  private cancelRequest = null;

  constructor() { }

  // Gets all the categories
  // @return Category[]
  async getCategories() {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/categories`,
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      this.categories = aux.data as Category[];
      return this.categories;
    } catch (err) {
      throw err;
    }
  }

  // Gets a single category
  // @param id: string
  // @return Category
  async getCategory(id: string) {
    let category: Category;

    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/categories/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      category = aux.data as Category;
      return category;
    } catch (err) {
      throw err;
    }
  }

}
