import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  @ViewChild('modalBasket', {static: true}) modalBasket: any;

  products: Product[];
  product: Product;
  private URI = environment.formerApi;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private productService: ProductsService, private cartService: CartService) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.findProduct(params.id);
  }

  async findProduct(id: string) {
    try {
      this.products = await this.productService.getProducts().catch(err => {
        throw err;
      }) as Product[];      
      this.product = this.products.find(item => {
        return item._id == id
      })
      console.log(this.product);
    } catch (err) {
      console.log(err);
    }
  }  

  backToShowCase() {
    this.router.navigateByUrl('/showcase');
  }

  async openBasketOptions(product: any) {
    const item = {
      product: product,
      quantity: 1
    }
    console.log(item);
    await this.cartService.saveInCart(item);
    this.modalBasket.nativeElement.show();
  }

  closeBasketOptions() {
    this.modalBasket.nativeElement.hide();
  }
}