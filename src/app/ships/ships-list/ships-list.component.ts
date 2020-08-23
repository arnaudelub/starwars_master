import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { SwapiResponse, Starship } from 'app/models/starship';
import { take } from "rxjs/operators";
import { ShipsService } from '../ships.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss']
})
export class ShipsListComponent implements OnInit {
  @Input() swapiResponse: SwapiResponse;
  @Input() isSearch: boolean;
  isLastPage = false;
  starshipsList: Starship[] = [];
  isLoading = false;
  previousMax: number;
  nextPage: String;
  isLastItem = false;

  constructor(
    private shipService: ShipsService,
    private router: Router) { }

  ngOnInit(): void {
    this.starshipsList = this.mapResponseWithIdAndImage(this.swapiResponse.results)
    this.nextPage = this.swapiResponse.next;
  }

  private mapResponseWithIdAndImage(response: Starship[]) {
    return response.map(
      (item, index) => {
        let splittedUrl = item.url.split("/");
        item.id = +splittedUrl[splittedUrl.length - 2];
        item.img = `https://starwars-visualguide.com/assets/img/starships/${item.id}.jpg`
        return item;
      }
    );
  }

  @HostListener("window:scroll", ["$event"])
  onScrolling() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos > max - 400) {
      if (!this.isLoading && this.starshipsList.length <= this.swapiResponse.count) {
        this.shipService.getStarship(this.swapiResponse.next).pipe(
          take(1)
        ).subscribe(
          (data: SwapiResponse) => {
            this.starshipsList = this.starshipsList.concat(
              this.mapResponseWithIdAndImage(data.results)
            );
            this.isLastItem = false;
            this.setNextPage(data);
          },
          err => { },
          () => {
            this.previousMax = max;
          }
        );
        this.isLoading = true;
      }
    } else if (pos > this.previousMax) {
      this.isLoading = false;
    }
  }

  setNextPage(data: SwapiResponse) {
    if (data.next === null) {
      this.isLastPage = true;
    } else {
      this.nextPage = data.next;
    }
  }

  /// With the infinite scroll, the array will update and When an array change, Angular re-render the whole DOM
  /// but if we use the trackBy Directive of Angular. With it, it will re-render only the item node node that have
  /// changed
  trackByID(index, ship: Starship) {
    return ship.id;
  }

  goToDetails(id: number) {
    this.router.navigate([`/ship/${id}`])
  }


}
