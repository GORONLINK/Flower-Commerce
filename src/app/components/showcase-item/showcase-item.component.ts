import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrls: ['./showcase-item.component.scss']
})
export class ShowcaseItemComponent implements OnInit {

  @Input() product: Product;

  private URI = environment.formerApi;

  constructor() { }

  ngOnInit() {
  }

}
