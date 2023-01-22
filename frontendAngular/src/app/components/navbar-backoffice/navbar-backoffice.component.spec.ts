import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBackofficeComponent } from './navbar-backoffice.component';

describe('NavbarBackofficeComponent', () => {
  let component: NavbarBackofficeComponent;
  let fixture: ComponentFixture<NavbarBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBackofficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
