import { Injectable } from '@angular/core';
import axios from "axios";
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: Product|Product[];
  private URI = environment.apiBase;
  private cancelRequest = null;

  constructor() { }

  // Gets all the products  
  // @return Product[]
  async getProducts() {
    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/products`,
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      this.products = aux.data as Product|Product[];
      return this.products;
    } catch (err) {
      throw err;
    }
  }

  // Gets a single product
  // @param id: string
  // @return Product
  async getProduct(id: string) {
    let product: Product;

    try {
      const aux = await axios({
        method: "get",
        url: `${this.URI}/products/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      product = aux.data as Product;
      return product;
    } catch (err) {
      throw err;
    }
  }

  // Posts a new product
  // @param Product
  // @return Product
  async createProduct(product: Product, token: string) {
    try {
      const aux = await axios({
        method: "POST",
        url: `${this.URI}/products`,
        data: product,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      return aux.data as Product;
    } catch (err) {
      throw err;
    }
  }

  // Updates a single product
  // @param id: string
  // @return Product
  async updateProduct(id: string, product: Product, token: any) {
    try {
      const aux = await axios({
        method: "put",
        url: `${this.URI}/products/${id}`,
        data: product,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });      

      return aux.data as Product;
    } catch (err) {
      throw err;
    }
  }

  // Deletes a single product
  // @param id: string
  // @return Product
  async deleteProduct(id: string, token: string) {
    try {
      const aux = await axios({
        method: "delete",
        url: `${this.URI}/products/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        cancelToken: new axios.CancelToken(c => {
          this.cancelRequest = c;
        })
      }).catch(err => {
        throw err;
      });

      return aux.data as Product;
    } catch (err) {
      throw err;
    }
  }
}
