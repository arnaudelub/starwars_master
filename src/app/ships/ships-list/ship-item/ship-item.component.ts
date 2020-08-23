import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { Starship } from 'app/models/starship';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss']
})
export class ShipItemComponent implements OnInit {
  @Input() ship: Starship;
  constructor(private router: Router) { }


  ngOnInit(): void {
  }


  showDetails() {
    // Passing the data object using the url
    this.router.navigate([`starships/details/`, this.ship.id],);
  }

}
