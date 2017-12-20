import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiRestService {

  constructor(private http: Http) {}

  list() {
    return this.http.get('http://localhost:3000/friends').toPromise().then(result => result.json());
  }

  remove(id: String) {
    return this.http.delete(`http://localhost:3000/friends/${ id }`).toPromise();
  }

  sortFriends() {
    return this.http.post('http://localhost:3000/friends/sort', {}).toPromise();
  }
}
