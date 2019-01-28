import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaViewComponent } from './ta-view.component';

describe('TaViewComponent', () => {
  let component: TaViewComponent;
  let fixture: ComponentFixture<TaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
