import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  get(path: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(path,
      { observe: 'body', responseType: 'json', params });
  }
}
