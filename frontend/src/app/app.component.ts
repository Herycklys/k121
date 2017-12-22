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

  @ViewChild(ModalDataFriendComponent) public ModalFriend: ModalDataFriendComponent;

  @ViewChild(FriendsListComponent) private FriendsList: FriendsListComponent;

  constructor(private api: ApiRestService) {
    that = this;
  }

  toggleSpinner(spinner: Boolean) {
    that._spinner = spinner;
  }

  makeSort() {
    this.toggleSpinner(true);

    this.api.sort().then(result => {
      this.toggleSpinner(false);
      
      if( result.no_secret_friends.length )
        return toastr.info(`Sorteado com sucesso mas alguns amigos seus ficaram sem amigo secreto, os amigos são <ul><li>${ result.no_secret_friends.map(friend => friend.nome).join('</li><li>') }</li></ul>`);
      else
        return toastr.success('Sorteado com sucesso!');
    }).catch(e => {
      if( e.status === 400 ) toastr.info('Quantidade insuficiente de amigos');
      else toastr.error("Erro ao sortear os seus amigos");

      console.error(e);

      this.toggleSpinner(false);
    });
  }

  saveNewFriend(dataSend) {
    this.toggleSpinner(true);

    this.api
      .create({
        _id: dataSend._id,
        nome: dataSend.nome,
        email: dataSend.email
      })
      .then(() => {
        toastr.success("Adicionado com sucesso");

        this.toggleSpinner(false);
      })
      .catch(e => {
        if( e.status === 422 ) toastr.info('Ops!! Parece que tem um amigo seu com esses dados, tente novamente com outros dados');
        else toastr.error('Erro ao adicionar o amigo, por favor tente novamente');

        this.toggleSpinner(false);
      });
  }
}
