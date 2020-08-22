import { Component, OnInit } from '@angular/core';

import { ShipsService } from './ships.service';
import { Observable } from 'rxjs';
import { swapiResponse } from '../models/starship';
@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {
  starships$: Observable<swapiResponse>
  constructor(private shipsService: ShipsService) { }

  ngOnInit(): void {
    this.starships$ = this.shipsService.getStarship();
  }

}
