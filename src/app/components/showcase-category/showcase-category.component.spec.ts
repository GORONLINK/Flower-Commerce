import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseCategoryComponent } from './showcase-category.component';

describe('ShowcaseCategoryComponent', () => {
  let component: ShowcaseCategoryComponent;
  let fixture: ComponentFixture<ShowcaseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
