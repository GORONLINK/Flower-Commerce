import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KindCarouselComponent } from './kind-carousel.component';

describe('KindCarouselComponent', () => {
  let component: KindCarouselComponent;
  let fixture: ComponentFixture<KindCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KindCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KindCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
