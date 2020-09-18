import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Product } from '../../models/product.model';
import { ImageService } from '../../services/image.service';
import { CategoriesService } from "../../services/categories.service";
import { ProductsService } from '../../services/products.service';
import { Category } from 'src/app/models/category.model';
import { CommunicationService } from 'src/app/services/communication.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  providers: [OnsNavigator],
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})

export class ShowcaseComponent implements OnInit {

  constructor(private router: Router, private imageService: ImageService,
    private categoryService: CategoriesService, private productService: ProductsService,
    private communication: CommunicationService, private _navigator: OnsNavigator) { }

  products: Product[];
  categories: Category[];
  
  base64Image: string;

  allProducts: Product[];
  sortList: string[] = [];
  filteredProducts: Product[];

  toggleClass: string = "fa fa-caret-up active rounded-item";

  selectedFile: ImageSnippet;

  ngOnInit() {    
    this.showCategories();
    this.showProducts();
  }

  push() {
    this._navigator.element.pushPage(ShowcaseComponent, {animation: 'slide', data: {aaa: 'bbb'}});
  }

  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      });
      console.log(this.categories);
    } catch (err) {
      console.log(err);
    }
  }

  async showProducts() {
    try {
      this.products = await this.productService.getProducts().catch(err => {
        throw err;
      }) as Product[];
      this.allProducts = this.products;
      console.log(this.products);
    } catch (err) {
      console.log(err);
    }
  }

  deactivateMainBubble() {
    this.toggleClass = "fa fa-caret-up rounded-item";
  }

  sortCategoryHandler(id: string) {
    if(id) {
      this.deactivateMainBubble();
      const aux = this.sortList.find(item => item == id);
      if(!aux) {
        this.sortList.push(id);
        console.log(this.sortList)
        const myArrayFiltered = this.sortByCategory(this.allProducts, this.sortList);
        this.products = [];
        this.products = myArrayFiltered;
        console.log(this.products);
      } else {        
        const index = this.sortList.indexOf(id);
        if (index > -1) this.sortList.splice(index, 1);
        console.log(this.sortList)
        const myArrayFiltered = this.sortByCategory(this.allProducts, this.sortList);
        if(this.sortList.length) {
          this.products = [];
          this.products = myArrayFiltered;
        } else {
          this.products = this.allProducts;
          this.toggleClass = "fa fa-caret-up active rounded-item";
        }
        console.log(this.products);
      }
    }
  }

  sortByCategory(items: Product[], categoriesList: String[]) {
    return items.filter((product) => {
      return categoriesList.some((item) => {
        return item === product.category;
      });
    });
  }

  getAllProducts() {
    this.products = this.allProducts;
    console.log(this.products);
    const data = {
      order: "reload"
    }
    this.communication.changeCategoryBubbleState(data);
    this.toggleClass = "fa fa-caret-up active rounded-item";
    this.sortList = [];
  }  

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file);
    const imgValue = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });

    imgValue.then(value => {
      this.base64Image = value as string;
      if(this.base64Image && (this.base64Image.length / 1024) < 2000) {
        if(localStorage.getItem('media-flower-commerce')) {
          localStorage.removeItem('media-flower-commerce');
          localStorage.setItem('media-flower-commerce', this.base64Image);
        } else {
          localStorage.setItem('media-flower-commerce', this.base64Image);
        }
        this.router.navigateByUrl("/item-form")
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "The size of the image is too big"
        });
      }
    })
  }

}