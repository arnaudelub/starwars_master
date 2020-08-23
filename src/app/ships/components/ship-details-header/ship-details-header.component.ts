import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { Starship } from 'app/models/starship';
import { containerAnimation } from '../../../core/animations/container_animation';
import { ShipsService } from 'app/ships/ships.service';
import { take } from 'rxjs/operators';

enum requestType { film, people }
@Component({
  selector: 'app-ship-details-header',
  templateUrl: './ship-details-header.component.html',
  styleUrls: ['./ship-details-header.component.scss'],
  animations: [
    containerAnimation
  ]
})
export class ShipDetailsHeaderComponent implements OnInit {
  @Input() ship: Starship;
  @Input() isDetailsPage: boolean;
  isToggled: boolean = true;
  toggleSymbole: '-' | '+' = '-';
  filmNames: String[] = [];
  peopleNames: String[] = [];

  constructor(private shipService: ShipsService) { }

  ngOnInit(): void {
    if (this.isDetailsPage) {

      this.getFilms();
      this.getPilots();
    }
  }

  private getPilots() {
    if (this.ship.pilots.length == 0) return;
    this.ship.pilots.forEach(
      pilot => this.getPilotDetails(pilot)
    );
  }

  private getFilms() {
    if (this.ship.films.length == 0) return;
    this.ship.films.forEach(
      film => this.getFilmDetails(film)
    );
  }



  priceIsUnknown() {
    return this.ship.cost_in_credits === 'unknown';
  }

  updateUrl() {
    this.ship.img = "assets/nostarships.png";
  }

  toggleDetails() {
    this.isToggled = !this.isToggled;
    this.toggleSymbole = this.isToggled ? '-' : '+';
  }

  getFilmDetails(url: String) {
    this.shipService.setEndpoint('films');
    this.parseResponse(url, requestType.film);
  }

  getPilotDetails(url: String) {
    this.shipService.setEndpoint('people');
    this.parseResponse(url, requestType.people);
  }

  private parseResponse(url: String, type: requestType) {

    this.shipService.getStarship(url)
      .pipe(take(1))
      .subscribe(
        data => {
          if (type === requestType.film) {
            this.filmNames.push(data['title'])
          } else {
            this.peopleNames.push(data['name'])
          }
        },
        err => { },
        () => this.shipService.setEndpoint('starships')
      )
  }
}
