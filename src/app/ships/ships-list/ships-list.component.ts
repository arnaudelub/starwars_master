import { Component, OnInit, Input } from '@angular/core';
import { swapiResponse, Starship } from 'app/models/starship';
import { devLog } from 'app/core/functions/development_logs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss']
})
export class ShipsListComponent implements OnInit {
  @Input() swapiResponse: swapiResponse;
  isLastPage = false;
  starshipsList: Starship[] = [];
  constructor() { }

  ngOnInit(): void {
    if (this.swapiResponse.next === null) {
      this.isLastPage = true;
    }
    this.starshipsList = this.swapiResponse.results;
    this.starshipsList.forEach(item => {
      let splittedUrl = item.url.split("/");
      item.id = +splittedUrl[splittedUrl.length - 2];
      console.log("This is the id", item.id);
      item.img = `https://starwars-visualguide.com/assets/img/starships/${item.id}.jpg`
    });
  }

  /// With the infinite scroll, the array will update and When an array change, Angular re-render the whole DOM
  /// but if we use the trackBy Directive of Angular. With it, it will re-render only the item node node that have
  /// changed
  trackByID(index, ship: Starship) {
    return ship.id;
  }

}
