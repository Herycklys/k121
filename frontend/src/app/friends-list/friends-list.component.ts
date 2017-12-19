import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
  providers: [ApiRestService]
})

export class FriendsListComponent implements OnInit {
  friends: Array<Object> = null;

  constructor(private api: ApiRestService) { }

  ngOnInit() {
    console.log(this.api.list);
  }

}
