import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePresentationComponent } from './time-presentation.component';

describe('TimePresentationComponent', () => {
  let component: TimePresentationComponent;
  let fixture: ComponentFixture<TimePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
