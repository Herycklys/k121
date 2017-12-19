import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { SortFriendDirective } from './sort-friend.directive';


@NgModule({
  declarations: [
    AppComponent,
    FriendsListComponent,
    SortFriendDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
