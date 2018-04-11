import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsComponent } from './tts.component';

describe('TtsComponent', () => {
  let component: TtsComponent;
  let fixture: ComponentFixture<TtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
