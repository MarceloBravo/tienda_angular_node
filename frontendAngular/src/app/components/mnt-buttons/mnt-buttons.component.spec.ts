import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntButtonsComponent } from './mnt-buttons.component';

describe('MntButtonsComponent', () => {
  let component: MntButtonsComponent;
  let fixture: ComponentFixture<MntButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MntButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MntButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
