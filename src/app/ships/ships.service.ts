import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {
  baseUrl = `${environment.swapiUrl}starships/`;
  constructor(private http: HttpClient) { }

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

  private getRequest(url) {
    return this.http.get(url,
      {
        headers: new HttpHeaders({
          'Authorization': 'none'
        })
      });
  }

}
