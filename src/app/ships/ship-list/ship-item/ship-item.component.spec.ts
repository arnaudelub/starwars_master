import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipItemComponent } from './ship-item.component';

describe('ShipItemComponent', () => {
  let component: ShipItemComponent;
  let fixture: ComponentFixture<ShipItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
