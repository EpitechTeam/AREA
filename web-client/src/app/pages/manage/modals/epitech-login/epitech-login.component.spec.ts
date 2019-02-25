import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpitechLoginComponent } from './epitech-login.component';

describe('EpitechLoginComponent', () => {
  let component: EpitechLoginComponent;
  let fixture: ComponentFixture<EpitechLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpitechLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpitechLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
