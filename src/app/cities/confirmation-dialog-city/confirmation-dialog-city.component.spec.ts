import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogCityComponent } from './confirmation-dialog-city.component';

describe('ConfirmationDialogCityComponent', () => {
  let component: ConfirmationDialogCityComponent;
  let fixture: ComponentFixture<ConfirmationDialogCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogCityComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDialogCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
