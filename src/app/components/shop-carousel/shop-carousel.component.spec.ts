import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCarouselComponent } from './shop-carousel.component';

describe('ShopCarouselComponent', () => {
  let component: ShopCarouselComponent;
  let fixture: ComponentFixture<ShopCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
