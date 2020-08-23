import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {
  uri = `${environment.swapiUrl}`;
  baseUrl = `${environment.swapiUrl}starships/`;
  endpoint: 'starships' | 'people' | 'films' = 'starships';
  constructor(private http: HttpClient) {
  }

  setEndpoint(endpoint: 'starships' | 'people' | 'films' = 'starships') {
    this.baseUrl = `${this.uri}${endpoint}/`;
  }

  getStarship(url?) {
    if (!url) {
      url = this.baseUrl;
    }
    url = url.replace(/^http:\/\//i, "https://");
    return this.getRequest(url);
  }

  getStarshipSearch(term: String) {
    let url = this.baseUrl + `?search=${term}`;
    return this.getRequest(url);
  }

  getStarshipDetails(id: number) {
    let url = `${this.baseUrl}${id}/`;
    return this.getRequest(url);
  }

  private getRequest(url) {
    return this.http.get(url,
      {
        headers: new HttpHeaders({
          'Authorization': 'none'
        })
      });
  }

}
