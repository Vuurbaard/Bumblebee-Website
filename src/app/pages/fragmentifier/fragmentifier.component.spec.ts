import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentifierComponent } from './fragmentifier.component';

describe('FragmentifierComponent', () => {
  let component: FragmentifierComponent;
  let fixture: ComponentFixture<FragmentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
