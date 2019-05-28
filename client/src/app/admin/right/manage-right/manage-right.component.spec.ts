import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRightComponent } from './manage-right.component';

describe('ManageRightComponent', () => {
  let component: ManageRightComponent;
  let fixture: ComponentFixture<ManageRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
