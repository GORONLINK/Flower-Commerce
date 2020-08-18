import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
 
@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrls: ['./showcase-item.component.scss']
})
export class ShowcaseItemComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
