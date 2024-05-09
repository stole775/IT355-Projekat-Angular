import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedOffersComponent  } from './featured-offers-component.component';

describe('FeaturedOffersComponent ', () => {
  let component: FeaturedOffersComponent ;
  let fixture: ComponentFixture<FeaturedOffersComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedOffersComponent ]
    });
    fixture = TestBed.createComponent(FeaturedOffersComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
