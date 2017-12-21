import { Component, ViewChild } from "@angular/core";
import { ApiRestService } from "./api-rest.service";
import { ModalDataFriendComponent } from "./modal-data-friend/modal-data-friend.component";
import { FriendsListComponent } from "./friends-list/friends-list.component";

let that: any;

declare var toastr: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ApiRestService]
})
export class AppComponent {
  _spinner: Boolean = false;

  new_friend: any = {
    title: "Novo amigo",
    _id: "",
    nome: "",
    email: ""
  };

  @ViewChild(ModalDataFriendComponent)
  private ModalFriend: ModalDataFriendComponent;

  @ViewChild(FriendsListComponent) private FriendsList: FriendsListComponent;

  constructor(private api: ApiRestService) {
    that = this;
  }

  toggleSpinner(spinner: Boolean) {
    that._spinner = spinner;
  }

  cleanData() {
    this.new_friend._id = "";
    this.new_friend.nome = "";
    this.new_friend.email = "";
  }

  makeSort() {
    this.toggleSpinner(true);

    this.api.sort().then(result => {
      this.toggleSpinner(false);
      
      if( result.no_secret_friends.length )
        return toastr.info(`Sorteado com sucesso mas alguns amigos seus ficaram sem amigo secreto, os amigos são <ul><li>${ result.no_secret_friends.join('</li><li>') }</li></ul>`);
      else
        return toastr.success('Sorteado com sucesso!');
    }).catch(e => {
      console.error(e);

      toastr.error("Erro ao sortear os seus amigos");

      this.toggleSpinner(false);
    });
  }

  saveNewFriend() {
    this.toggleSpinner(true);

    this.api
      .create({
        _id: this.new_friend._id,
        nome: this.new_friend.nome,
        email: this.new_friend.email
      })
      .then(() => {
        toastr.success("Adicionado com sucesso");

        this.toggleSpinner(false);

        this.cleanData();
      })
      .catch(e => {
        console.error(e);

        toastr.error("Erro ao adicionar o amigo, por favor tente novamente");

        this.toggleSpinner(false);
      });
  }
}
