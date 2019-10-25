import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupAComponent } from './view-group-a.component';

describe('ViewGroupAComponent', () => {
  let component: ViewGroupAComponent;
  let fixture: ComponentFixture<ViewGroupAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroupAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
