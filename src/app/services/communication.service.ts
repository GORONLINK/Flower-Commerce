import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {  
  
  private categoryBubbleState = new BehaviorSubject(null);
  currentCategoryBubbleState = this.categoryBubbleState.asObservable();    

  constructor() { }  

  // Checks the Single Score State
  changeCategoryBubbleState(data: any) {
    this.categoryBubbleState.next(data);
  }  

}