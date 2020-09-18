import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  products: any[] = [];
  public productQuantity = new BehaviorSubject<Number>(0);

  async saveInCart(item: any) {
    this.products = this.getCart();
    console.log(this.products);
    var aux = await this.products.find((elem) => elem.product._id === item.product._id);
    if (aux) {
      var index = this.products.indexOf(aux);
      this.products[index].quantity += item.quantity;
    } else {
      this.products.push(item);
    }  	
    localStorage.setItem('basket-flower-commerce', JSON.stringify(this.products));
    this.productQuantity.next(this.products.length);
    console.log(this.products);
  }

  getCart() {
    if(!localStorage.getItem('basket-flower-commerce')){
      return {
        products: []
      };
    }else {
      return JSON.parse(localStorage.getItem('basket-flower-commerce'));
    }
  }

  async updateCart(products: any[]) {
    localStorage.removeItem('basket-flower-commerce');
    localStorage.setItem('basket-flower-commerce', JSON.stringify(products));
    this.productQuantity.next(products.length);
  }

  deleteAllProducts() {
    localStorage.removeItem('basket-flower-commerce');
    this.productQuantity.next(0);
  }
}
