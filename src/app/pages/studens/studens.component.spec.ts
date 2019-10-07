import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudensComponent } from './studens.component';

describe('StudensComponent', () => {
  let component: StudensComponent;
  let fixture: ComponentFixture<StudensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
