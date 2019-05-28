import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightListComponent } from './right-list.component';

describe('RightListComponent', () => {
  let component: RightListComponent;
  let fixture: ComponentFixture<RightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
