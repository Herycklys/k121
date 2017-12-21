import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ApiRestService } from "../api-rest.service";
import { Friend } from "../friend";
import { ModalDataFriendComponent } from "../modal-data-friend/modal-data-friend.component";

declare var toastr: any;

@Component({
  selector: "app-friends-list",
  templateUrl: "./friends-list.component.html",
  styleUrls: ["./friends-list.component.css"],
  providers: [ApiRestService]
})
export class FriendsListComponent implements OnInit {
  friends: Array<Friend> = [];

  friend_selected: any = {
    title: "",
    _id: String,
    nome: String,
    email: String
  };

  @Input() spinner: Function;

  @ViewChild(ModalDataFriendComponent)
  private ModalFriend: ModalDataFriendComponent;

  constructor(private api: ApiRestService) {}

  loadData(): void {
    this.api
      .list()
      .then(result => {
        this.friends = result.data;
      })
      .catch(() => {
        toastr.error("Erro ao carregar os dados.");
      });
  }

  ngOnInit() {
    this.loadData();
  }

  editFriend(friend: Friend): void {
    this.friend_selected = {
      title: `Editar o amigo ${friend.nome}`,
      _id: friend._id,
      nome: friend.nome,
      email: friend.email
    };

    this.ModalFriend.modalToggle();
  }

  saveEditFriend() {
    this.spinner(true);

    this.api
      .edit(this.friend_selected._id, {
        _id: this.friend_selected._id,
        nome: this.friend_selected.nome,
        email: this.friend_selected.email
      })
      .then(() => {
        toastr.success("Editado com sucesso");

        this.spinner(false);
      })
      .catch(() => {
        toastr.error("Erro ao editar o amigo, por favor tente novamente.");

        this.spinner(false);
      });
  }

  deleteFriend(id: String) {
    this.spinner(true);

    this.api
      .remove(id)
      .then(() => {
        toastr.success("Apagado com sucesso");

        this.spinner(false);
      })
      .catch(() => {
        toastr.error("Erro ao apagar o amigo, por favor tente novamente.");

        this.spinner(false);
      });
  }
}
