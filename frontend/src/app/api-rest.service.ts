import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Friend } from './friend';

@Injectable()
export class ApiRestService {

  constructor(private http: Http) { }

  list() {
    return this.http.get(`${environment.url_api}/friends`).toPromise().then(result => result.json());
  }

  remove(id: String) {
    return this.http.delete(`${environment.url_api}/friends/${id}`).toPromise();
  }

  sortFriends() {
    return this.http.post(`${environment.url_api}/friends/sort`, {}).toPromise().then(result => result.json());
  }

  editFriend(id: String, friend: Friend) {
    return this.http.post(`${environment.url_api}/friends/${ id }`, friend).toPromise().then(result => result.json());
  }
}
