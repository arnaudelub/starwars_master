import { Component, OnInit } from '@angular/core';

import { ShipsService } from './ships.service';
import { Observable } from 'rxjs';
import { swapiResponse } from '../models/starship';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {
  starships$: Observable<swapiResponse>
  constructor(private shipsService: ShipsService,
    private router: Router) { }

  ngOnInit(): void {
    this.starships$ = this.shipsService.getStarship();
  }

  isShipListRoute() {
    return this.router.isActive('ships', true);
  }

}
