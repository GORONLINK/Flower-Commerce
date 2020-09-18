import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  basket: any[] = [
    {
      quantity: 1,
      product: {
        _id: "1",
        name: "Item 1",
        discount: 5,
        price: 200
      }
    },
    {
      quantity: 1,
      product: {
        _id: "2",
        name: "Item 2",
        discount: 5,
        price: 200
      }
    },
    {
      quantity: 1,
      product: {
        _id: "3",
        name: "Item 3",
        discount: 5,
        price: 200
      }
    }
  ];
  subtotal: number;
  total: number;
  checkoutMode: string;

  constructor(private cartService: CartService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCheckoutMode();
    this.getTotal();
    //this.getCartProducts();
  }

  getCheckoutMode() {    
    this.checkoutMode = this.activatedRoute.snapshot.params.mode;
  }

  getCartProducts() {
    this.basket = this.cartService.getCart();
    console.log(this.basket);
    this.getTotal();
  }

  getTotal() {
    this.subtotal = 0;
    if(this.basket) {
      this.basket.forEach((item) => {
        this.subtotal += item.product.price * (1 - (item.product.discount / 100)) * item.quantity;
      });
    }
    this.total = this.subtotal;
  }

  async deleteCartProduct(index: number) {
    this.basket.splice(index, 1);
    await this.cartService.updateCart(this.basket);
    this.getCartProducts();
  }

}
