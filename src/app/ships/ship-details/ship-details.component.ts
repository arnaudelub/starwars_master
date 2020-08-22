import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShipsService } from '../ships.service';
import { Starship } from 'app/models/starship';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit {

  ship: Starship;
  constructor(
    private shipService: ShipsService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getShip();
  }

  getShip() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shipService.getStarshipDetails(id)
      .subscribe(
        ship => this.ship = ship
      );
  }


}
