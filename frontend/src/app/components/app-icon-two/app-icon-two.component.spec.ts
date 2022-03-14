import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIconTwoComponent } from './app-icon-two.component';

describe('AppIconTwoComponent', () => {
  let component: AppIconTwoComponent;
  let fixture: ComponentFixture<AppIconTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppIconTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIconTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
