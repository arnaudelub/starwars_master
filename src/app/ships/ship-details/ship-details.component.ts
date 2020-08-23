import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShipsService } from '../ships.service';
import { Starship } from 'app/models/starship';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ship-details',
  templateUrl: './ship-details.component.html',
  styleUrls: ['./ship-details.component.scss']
})
export class ShipDetailsComponent implements OnInit, OnDestroy {

  private destroyed$: Subject<boolean> = new Subject();
  ship: Starship;
  fakeData: String[] = []; // remove this for production
  counter: number = 1; // can be removed too for production
  constructor(
    private shipService: ShipsService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getShip();
  }

  /* This is for demonstration purpose only
   * Do not use in production
   */
  mockNewData() {
    //In case not being removed
    if (!this.isDevelopment()) return;
    this.fakeData.push(`New data received... ${this.counter}`);
    this.counter++;
  }

  getShip() {
    /// In this case, we want to receive the new data constantly,
    /// changes in the stock, picture, data so we are using
    /// takeUntil instead of take(1)
    const id = +this.route.snapshot.paramMap.get('id');
    this.shipService.getStarshipDetails(id)
      .pipe(
        takeUntil(this.destroyed$),
      )
      .subscribe(
        ship => {
          this.ship = ship
          this.mockNewData() // Remove for production
        },
        err => null,
        () => this.addImage()
      );
  }
  private addImage() {
    let splittedUrl = this.ship.url.split("/");
    this.ship.id = +splittedUrl[splittedUrl.length - 2];
    this.ship.img = `https://starwars-visualguide.com/assets/img/starships/${this.ship.id}.jpg`
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  isDevelopment() {
    return !environment.production;
  }
}
