import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerValidationComponent } from './buyer-validation.component';

describe('BuyerValidationComponent', () => {
  let component: BuyerValidationComponent;
  let fixture: ComponentFixture<BuyerValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
