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

  friend_selected: any;

  @Input() spinner: Function;

  data_loading: Boolean = true;

  @ViewChild(ModalDataFriendComponent)
  private ModalFriend: ModalDataFriendComponent;

  constructor(private api: ApiRestService) {}

  loadData(): void {
    this.data_loading = true;

    this.api
      .list()
      .then(result => {
        this.friends = result.data;

        this.data_loading = false;
      })
      .catch(() => {
        toastr.error("Erro ao carregar os dados.");

        this.data_loading = false;
      });
  }

  ngOnInit() {
    this.loadData();
  }

  editFriend(friend: Friend): void {
    this.friend_selected = {
      _id: friend._id,
    };

    this.ModalFriend.show({
      nome: friend.nome,
      email: friend.email,
      title: `Editar o amigo "${friend.nome}"`
    });
  }

  saveEditFriend(dataSend) {
    this.spinner(true);

    this.api
      .edit(this.friend_selected._id, {
        _id: this.friend_selected._id,
        nome: dataSend.nome,
        email: dataSend.email
      })
      .then(() => {
        toastr.success("Editado com sucesso");

        this.spinner(false);
      })
      .catch(e => {
        if( e.status === 422 ) toastr.info('Ops!! Parece que tem um amigo seu com esses dados, tente novamente com outros dados');
        else toastr.error("Erro ao editar o amigo, por favor tente novamente.");

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
