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
    return this.http.get(url,
      {
        headers: new HttpHeaders({
          'Authorization': 'none'
        })
      });
  }

}
