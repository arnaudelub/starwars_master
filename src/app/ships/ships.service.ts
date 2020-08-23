import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SwapiResponse } from 'app/models/starship';
import { shareReplay, switchMap } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

const BUFFER_SIZE = 1;
const INTERVAL = 10000;
@Injectable({
  providedIn: 'root'
})
export class ShipsService {
  private cache$: Observable<SwapiResponse>;

  uri = `${environment.swapiUrl}`;
  baseUrl = `${environment.swapiUrl}starships/`;
  endpoint: 'starships' | 'people' | 'films' = 'starships';
  constructor(private http: HttpClient) { }

  private getRequest(url) {
    return this.http.get(url,
      {
        headers: new HttpHeaders({
          'Authorization': 'none'
        })
      });
  }

  public get ships() {
    if (!this.cache$) {
      this.cache$ = this.getStarship();
    }
    return this.cache$;
  }

  setEndpoint(endpoint: 'starships' | 'people' | 'films' = 'starships') {
    this.baseUrl = `${this.uri}${endpoint}/`;
  }

  getStarship(url?): Observable<SwapiResponse> {
    const timer$ = timer(0, INTERVAL);

    if (!url) {
      url = this.baseUrl;
    }
    url = url.replace(/^http:\/\//i, "https://");
    return timer$.pipe(
      switchMap(() => this.getRequest(url)),
      shareReplay(BUFFER_SIZE));
  }

  getStarshipSearch(term: String) {
    let url = this.baseUrl + `?search=${term}`;
    return this.getRequest(url);
  }

  getStarshipDetails(id: number) {
    const timer$ = timer(0, INTERVAL);
    const url = `${this.baseUrl}${id}/`;
    return timer$.pipe(
      switchMap(() => this.getRequest(url)),
      shareReplay(BUFFER_SIZE));
  }


}
