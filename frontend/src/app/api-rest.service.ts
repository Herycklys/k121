import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiRestService {

  constructor(private http: Http) {}

  list() {
    return this.http.get('https://api-k121.herokuapp.com/friends').toPromise().then(result => result.json());
  }

  remove(id: String) {
    return this.http.delete(`https://api-k121.herokuapp.com/friends/${ id }`).toPromise();
  }

  sortFriends() {
    return this.http.post('https://api-k121.herokuapp.com/friends/sort', {}).toPromise().then(result => result.json());
  }
}
