import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaveComponent } from './add-wave.component';

describe('AddWaveComponent', () => {
  let component: AddWaveComponent;
  let fixture: ComponentFixture<AddWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
