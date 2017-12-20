import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Friend } from '../friend';
import { ModalDataFriendComponent } from '../modal-data-friend/modal-data-friend.component';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
  providers: [ApiRestService]
})
export class FriendsListComponent implements OnInit {
  friends: Array<Friend> = [];

  friend_selected: any = {
    title: '',
    _id: String,
    nome: String,
    email: String
  };

  @ViewChild(ModalDataFriendComponent)
  private ModalFriend: ModalDataFriendComponent;

  @Input() spinner: Function;

  constructor(private api: ApiRestService) { }

  loadData(): void {
    this.api.list().then(result => {
      this.friends = result.data;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  editFriend(friend: Friend): void {
    this.friend_selected = {
      title: `Editar o amigo ${ friend.nome }`,
      _id: friend._id,
      nome: friend.nome,
      email: friend.email
    };
    
    this.ModalFriend.modalToggle();
  }

  saveEditFriend() {
    console.log(
      this.friend_selected
    );
  }

  deleteFriend(id: String) {
    this.spinner(true);

    this.api.remove(id).then(() => {
      this.loadData();

      this.spinner(false);
    }).catch(e => {
      this.spinner(false);
    });
  }
}
