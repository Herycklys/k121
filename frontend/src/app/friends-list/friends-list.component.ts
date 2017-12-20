import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
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

  friend_selected = {
    title: '',
    _id: '',
    nome: '',
    email: ''
  };

  @ViewChild(ModalDataFriendComponent)
  private ModalFriend: ModalDataFriendComponent;

  @Output() spinner:EventEmitter<Boolean> = new EventEmitter();

  constructor(private api: ApiRestService) { }

  loadData(): void{
    this.api.list().then(result => {
      this.friends = result.data;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  editFriend(friend: Friend): void {
    this.friend_selected = Object.assign({}, friend);

    this.friend_selected.title = `Editar o amigo ${ friend.nome }`;
    
    this.ModalFriend.modalToggle();
  }

  saveEditFriend() {
    console.log(
      this.friend_selected
    );
  }

  deleteFriend(id: String) {
    alert('HERE');

    this.spinner.emit(true);

    this.spinner.emit(false);
    /* this.api.remove(id).then(() => {
      this.loadData();
    }); */
  }
}
