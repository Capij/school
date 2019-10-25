import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupAdminComponent } from './add-group-admin.component';

describe('AddGroupAdminComponent', () => {
  let component: AddGroupAdminComponent;
  let fixture: ComponentFixture<AddGroupAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
