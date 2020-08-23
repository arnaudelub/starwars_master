import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDetailsHeaderComponent } from './ship-details-header.component';

describe('ShipDetailsHeaderComponent', () => {
  let component: ShipDetailsHeaderComponent;
  let fixture: ComponentFixture<ShipDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipDetailsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
