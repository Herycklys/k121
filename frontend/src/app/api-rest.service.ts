import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiRestService {

  constructor(private http: Http) {}

  list() {
    return this.http.get('http://localhost:3000/friends').toPromise();
  }

}
