import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajGradComponent } from './dodaj-grad.component';

describe('DodajGradComponent', () => {
  let component: DodajGradComponent;
  let fixture: ComponentFixture<DodajGradComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajGradComponent]
    });
    fixture = TestBed.createComponent(DodajGradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
