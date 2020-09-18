import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.model';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-kind-carousel',
  templateUrl: './kind-carousel.component.html',
  styleUrls: ['./kind-carousel.component.scss']
})
export class KindCarouselComponent implements OnInit {

  @Input() category: Category;  
  @Output() categoryId: EventEmitter<String> = new EventEmitter();

  aux: boolean = false;
  toggleClass: string = "fa fa-caret-up rounded-item";

  constructor(private communication: CommunicationService) { }

  ngOnInit() {
    this.changeStateListener();
  }  

  toggle() {
    if(!this.aux) {
      this.toggleClass = "fa fa-caret-up rounded-item active"
      this.aux = true;
    } else {
      this.toggleClass = "fa fa-caret-up rounded-item"
      this.aux = false;
    }
  }

  deactivate() {
    this.toggleClass = "fa fa-caret-up rounded-item"
    this.aux = false;
  }

  sendId() {
    this.categoryId.emit(this.category._id);
    this.toggle();
  }

  changeStateListener() {
    this.communication.currentCategoryBubbleState.subscribe((res: any) => {
      if(res) {
        if(res.order == "reload") {          
          this.deactivate();
        } 
      }
    })
  }

}
