import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { Starship } from 'app/models/starship';
import { devLog } from 'app/core/functions/development_logs';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent implements OnInit {
  @Input() ship: Starship;
  constructor() { }


  ngOnInit(): void {
    devLog(this.ship);
  }

  updateUrl() {
    this.ship.img = "assets/nostarships.png";
  }

  priceIsUnknown() {
    return this.ship.cost_in_credits === 'unknown';
  }

}
