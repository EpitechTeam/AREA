import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWavesComponent } from './my-waves.component';

describe('MyWavesComponent', () => {
  let component: MyWavesComponent;
  let fixture: ComponentFixture<MyWavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
