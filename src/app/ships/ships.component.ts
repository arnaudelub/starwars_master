import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { ShipsService } from './ships.service';
import { Observable, Subject, fromEvent } from 'rxjs';
import { SwapiResponse } from '../models/starship';
import { Router, UrlTree, Navigation, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { devLog } from 'app/core/functions/development_logs';
import { takeUntil, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { showInputAnimation } from '../core/animations/show_input_animation';
@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  animations: [
    showInputAnimation
  ]
})

export class ShipsComponent implements OnInit, OnDestroy, AfterViewInit {
  private inputSubject: Subject<String> = new Subject();
  protected starships$: Observable<SwapiResponse>;
  private currentRoute = "/starships";
  private destroyed$: Subject<boolean> = new Subject();
  public navigateTo: "/starships/me" | "/starships" = "/starships/me";
  public iconImage: "assets/stormtrooper.png" | "assets/close.png" = "assets/stormtrooper.png";
  public showSearchBar = true;
  public searchInputOpen = false;
  public searchTerm: String;
  public isSearchResult = false;

  constructor(private shipsService: ShipsService,
    private router: Router) {

  }
  ngAfterViewInit(): void {
    this.inputSubject
      .pipe(takeUntil(this.destroyed$))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          if (data == "" && !this.isSearchResult) {
            this.router.navigate(['starships']);
            return;
          }

          this.isSearchResult = true;
          this.starships$ = this.shipsService.getStarshipSearch(data);
        },
        err => { },
        () => console.log("complete")
      );
  }

  ngOnInit(): void {
    this.router.events.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      state => {
        if (state instanceof NavigationEnd) {
          this.currentRoute = state.url;
          this.setFromRoute();
          devLog(state.url);

        }
      }, err => { },
      () => {
        devLog("Router subsciption completed");
      }
    )
    this.starships$ = this.shipsService.getStarship();
  }

  getStarshipsAtPage(url: String) {
    console.log("Loading url: ", url)
    this.starships$ = this.shipsService.getStarship(url);
  }

  setFromRoute() {
    if (this.currentRoute === "/starships") {
      this.navigateTo = "/starships/me";
      this.iconImage = "assets/stormtrooper.png";
      this.showSearchBar = true;
    } else {
      this.navigateTo = "/starships"
      this.iconImage = "assets/close.png";
      this.showSearchBar = false;
    }
  }

  isShipListRoute() {
    return this.currentRoute === "/starships";
  }

  showHideInput() {
    this.searchInputOpen = !this.searchInputOpen;
  }

  onChange(event) {
    this.inputSubject.next(this.searchTerm);
  }

  searchResultReceived() {
    this.isSearchResult = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next;
    this.destroyed$.complete;
  }

}
