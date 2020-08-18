import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Product } from '../../models/product.model';

@Component({  
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  constructor(private router: Router) { }

  products: Product[] = [
    {
      _id: "1",
      name: "Item 1",
      price: 320,
      discount: 300,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 57,
      image: "../../../assets/img/products/2020-07-02 06.36.22 2344362269704304656_1226070851.jpg",      
      vendor: "Partner 1"
    },
    {
      _id: "2",
      name: "Item 2",
      price: 290,
      discount: 282,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 42,
      image: "../../../assets/img/products/2020-07-03 06.42.55 2345090346067467133_1226070851.jpg",
      vendor: "Partner 2"
    },
    {
      _id: "3",
      name: "Item 3",
      price: 310,
      discount: 300,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 106,
      image: "../../../assets/img/products/2020-07-04 06.51.57 2345819665110880203_1226070851.jpg",
      vendor: "Partner 3"
    },
    {
      _id: "4",
      name: "Item 4",
      price: 385,
      discount: 350,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 24,
      image: "../../../assets/img/products/2020-07-07 06.51.14 2347993630092630449_1226070851.jpg",
      vendor: "Partner 4"
    },
    {
      _id: "5",
      name: "Item 5",
      price: 422,
      discount: 413,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 88,
      image: "../../../assets/img/products/2020-07-08 06.52.20 2348718959992030560_1226070851.jpg",
      vendor: "Partner 5"
    },
    {
      _id: "6",
      name: "Item 6",
      price: 250,
      discount: 230,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 39,
      image: "../../../assets/img/products/2020-07-09 06.46.21 2349440724162834347_1226070851.jpg",
      vendor: "Partner 6"
    },
    {
      _id: "7",
      name: "Item 7",
      price: 320,
      discount: 300,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 5,
      image: "../../../assets/img/products/2020-07-10 06.37.33 2350161066514668313_1226070851.jpg",
      vendor: "Partner 7"
    },
    {
      _id: "8",
      name: "Item 8",
      price: 347,
      discount: 321,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 0,
      image: "../../../assets/img/products/2020-07-10 06.37.33 2350161069903487917_1226070851.jpg",
      vendor: "Partner 8"
    },
    {
      _id: "9",
      name: "Item 9",
      price: 500,
      discount: 450,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 111,
      image: "../../../assets/img/products/2020-07-11 06.41.21 2350887764713466907_1226070851.jpg",
      vendor: "Partner 9"
    },
    {
      _id: "10",
      name: "Item 10",
      price: 320,
      discount: 300,
      size: "15 x 6 x 7'",
      sides: 1,
      quantity: 99,
      image: "../../../assets/img/products/2020-07-14 06.44.46 2353063805791913635_1226070851.jpg",
      vendor: "Partner 10"
    }
  ];

  ngOnInit() {
  }  
}
