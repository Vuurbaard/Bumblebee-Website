import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentsComponent } from './fragments.component';

describe('FragmentsComponent', () => {
  let component: FragmentsComponent;
  let fixture: ComponentFixture<FragmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
