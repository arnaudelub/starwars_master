import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ShipsService } from './ships.service';
import { Observable, Subject, fromEvent, merge } from 'rxjs';
import { SwapiResponse } from '../models/starship';
import { Router, UrlTree, Navigation, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { devLog } from 'app/core/functions/development_logs';
import { takeUntil, map, debounceTime, distinctUntilChanged, take, mergeMap, skip, mapTo } from 'rxjs/operators';

import { showInputAnimation } from '../core/animations/show_input_animation';
@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
  animations: [
    showInputAnimation
  ]
})

export class ShipsComponent implements OnInit, AfterViewInit, OnDestroy {
  protected starships$: Observable<SwapiResponse>;

  private inputSubject: Subject<String> = new Subject();
  private updated$ = new Subject();
  private currentRoute = "/starships";
  private destroyed$: Subject<boolean> = new Subject();

  public notificationToggle$: Observable<boolean>;
  public navigateTo: "/starships/me" | "/starships" = "/starships/me";
  public iconImage: "assets/stormtrooper.png" | "assets/close.png" = "assets/stormtrooper.png";
  public showSearchBar = true;
  public searchInputOpen = false;
  public searchTerm: String;
  public isSearchResult = false;

  constructor(
    private shipsService: ShipsService,
    private router: Router,
    private location: Location) {

  }
  ngAfterViewInit(): void {
    this.subscribeToInputSubject();
  }

  ngOnInit(): void {
    this.subscribeToRouterEvents();

    const shipsAtFirstLoad = this.getShipsOnce();

    const updates$ = this.updated$.pipe(
      mergeMap(() => this.getShipsOnce())
    );

    this.starships$ = this.getShipsOnce();

    const firstNofication$ = this.shipsService.ships.pipe(skip(1)) // We don't want to notify at first load => skip(1)

    const open$ = firstNofication$.pipe(mapTo(true));
    const close$ = this.updated$.pipe(mapTo(false));
    this.notificationToggle$ = merge(open$, close$);

  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(
      takeUntil(this.destroyed$) // to avoid memory leak
    ).subscribe(
      state => {
        if (state instanceof NavigationEnd) {
          this.currentRoute = state.url;
          this.setFromRoute();

        }
      }, err => { },
      () => {
        devLog("Router subsciption completed");
      }
    )
  }

  private subscribeToInputSubject() {
    this.inputSubject
      .pipe(takeUntil(this.destroyed$))
      .pipe(debounceTime(999))
      .pipe(distinctUntilChanged())
      .subscribe(
        data => {
          if (data == "" && !this.isSearchResult) {
            this.router.navigate(['starships']);
            return;
          }

          this.isSearchResult = true;
          this.starships$ = this.shipsService.getStarshipSearch(data).pipe(take(1));
        },
        err => { },
        () => console.log("complete")
      );
  }

  private getShipsOnce() {
    return this.shipsService.getStarship().pipe(take(1));
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

  navigate() {
    if (this.iconImage === "assets/close.png") {
      this.location.back();
    } else {
      this.router.navigate([this.navigateTo]);
    }
  }

  updateList() {
    this.updated$.next();
  }

  ngOnDestroy(): void {
    this.destroyed$.next;
    this.destroyed$.complete;
  }

}
