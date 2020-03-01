import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimingControlsComponent } from './timing-controls.component';

describe('TimingControlsComponent', () => {
  let component: TimingControlsComponent;
  let fixture: ComponentFixture<TimingControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimingControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimingControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
