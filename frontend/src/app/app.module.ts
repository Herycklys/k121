import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ModalDataFriendComponent } from './modal-data-friend/modal-data-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent,
    ModalDataFriendComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
