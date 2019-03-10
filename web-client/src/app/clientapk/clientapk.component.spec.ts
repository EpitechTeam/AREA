import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientapkComponent } from './clientapk.component';

describe('ClientapkComponent', () => {
  let component: ClientapkComponent;
  let fixture: ComponentFixture<ClientapkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientapkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientapkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
