import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {  

  itemForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'. -]+$'), Validators.minLength(1)]),
    price: new FormControl('', [Validators.required, Validators.minLength(1)]),
    discount: new FormControl('', Validators.compose([Validators.min(0), Validators.max(100)])),
    description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]),
    sizes: new FormControl(''),
    sides: new FormControl(''),
    quantity: new FormControl(''),
    extras: new FormControl('')
  });
  
  categories: Category[];
  selectedCategory: string = "";
  image64: string;
  imageFile: File;
  imageURL: string;  
  submitted: boolean = false;

  constructor(private router: Router, private productService: ProductsService,
    private categoryService: CategoriesService, private imageService: ImageService) { }

  ngOnInit() {
    this.getBase64Image();
    this.convertToFile();
    this.showCategories();
  }

  getBase64Image() {
    this.image64 = localStorage.getItem('media-flower-commerce') as string;    
  }

  getMimeType(URI: string) {
    const dataURI = URI.split(',')[0];
    const first = dataURI.indexOf('/') + 1;
    const last = dataURI.indexOf(';');
    return dataURI.substring(first, last);
  }

  convertToFile() {    
    const imageBlob = this.dataURItoBlob(this.image64);
    this.imageFile = new File([imageBlob], `image.${this.getMimeType(this.image64)}` , { type: `image/${this.getMimeType(this.image64)}` });
    console.log(this.imageFile);
 }

  dataURItoBlob(dataURI) {
    const uri = dataURI.split(',')[1];
    const byteString = window.atob(uri);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: `image/${this.getMimeType(dataURI)}` });    
    return blob;
  }

  async onSubmit() {    
    Swal.fire({
      title: "Proccessing...",
      allowOutsideClick: false
    })
    Swal.showLoading();
    this.submitted = true;
    try {      
      const uploadedImage = await this.imageService.uploadImage(this.imageFile)
      .catch(err => {throw err;}) as any;
      this.imageURL = uploadedImage.filename;
      console.log(this.imageURL);
      const createdProduct = await this.productService.createProduct(this.product)
      .catch(err => {throw err;});
      console.log(createdProduct);
      Swal.fire({
        title: "Success!",
        icon: "success",
        html: `You have created the product ${createdProduct.name}`
      });
      this.router.navigate(['/showcase']);    
    } catch(err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Something went wrong.<br>Verify the data and try again"
      });
      this.submitted = false;
    }
  }

  get product() {
    return {
      name: this.itemForm.get('name').value as String,
      description: this.itemForm.get('description').value as String,
      price: this.itemForm.get('price').value as Number,
      discount: this.itemForm.get('discount').value ? this.itemForm.get('discount').value as Number : 0,
      sizes: this.itemForm.get('sizes').value ? this.itemForm.get('sizes').value as Number : 0,
      sides: this.itemForm.get('sides').value ? this.itemForm.get('sides').value as Number : 0,
      quantity: this.itemForm.get('quantity').value ? this.itemForm.get('quantity').value as Number : 0,
      extras: [],
      media: [this.imageURL],
      category: this.selectedCategory ? this.selectedCategory : null
    }
  }

  // Uploads the image right and gets the image URL
  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      })
      console.log(this.categories);
    } catch (error) {
      console.log(error)
    }
  }

  getSelectedCategory(event, id: string) {
    this.selectedCategory = id;
    console.log(this.selectedCategory);
  }

  backToShowcase() {
    this.router.navigateByUrl("/showcase");
  }

}