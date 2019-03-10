import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatBottomSheetModule,
  MatDialogModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { HeaderSubMainComponent } from './header-sub-main/header-sub-main.component';
import { ButtonIconComponent } from './parts/button-icon/button-icon.component';
import { ExamplesComponent } from './examples/examples.component';
import { ProfileTextAllComponent } from './parts/profile-text-all/profile-text-all.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ListAgentComponent } from './parts/list-agent/list-agent.component';
import { TopComponent } from './top/top.component';
import { ProfileTextAllWithIconComponent } from './parts/profile-text-all-with-icon/profile-text-all-with-icon.component';
import { ProfileListEachComponent } from './parts/profile-list-each/profile-list-each.component';
import { ListHeaderComponent } from './parts/list-header/list-header.component';
import { ListRoomComponent } from './parts/list-room/list-room.component';
import { RoomListEachComponent } from './parts/room-list-each/room-list-each.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SearcherComponent } from './parts/searcher/searcher.component';
import { AgentsComponent } from './agents/agents.component';
import { RoomsSearchOptionComponent } from './rooms/rooms-search-option/rooms-search-option.component';
import { FormsModule } from '@angular/forms';
import { AppRootComponent } from './app-root/app-root.component';
import { ProfileEditorComponent } from './parts/profile-editor/profile-editor.component';
import { CheckboxWithIconComponent } from './parts/checkbox-with-icon/checkbox-with-icon.component';
import { AgentMessagesComponent } from './agent-messages/agent-messages.component';
import { ListAgentMessageComponent } from './parts/list-agent-message/list-agent-message.component';
import { AgentMessageComponent } from './parts/agent-message/agent-message.component';
import { AgentMessagesSearchOptionComponent } from './agent-messages/agent-messages-search-option/agent-messages-search-option.component';
import { RoomComponent } from './room/room.component';
import { RoomInfoComponent } from './room/room-info/room-info.component';
import { DatetimeStringPipe } from './pipe/date';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMainComponent,
    HeaderSubMainComponent,
    ButtonIconComponent,
    ExamplesComponent,
    ProfileTextAllComponent,
    SideMenuComponent,
    ListAgentComponent,
    TopComponent,
    ProfileTextAllWithIconComponent,
    ProfileListEachComponent,
    ListHeaderComponent,
    ListRoomComponent,
    RoomListEachComponent,
    RoomsComponent,
    SearcherComponent,
    AgentsComponent,
    RoomsSearchOptionComponent,
    AppRootComponent,
    ProfileEditorComponent,
    CheckboxWithIconComponent,
    AgentMessagesComponent,
    ListAgentMessageComponent,
    AgentMessageComponent,
    AgentMessagesSearchOptionComponent,
    RoomComponent,
    RoomInfoComponent,
    // Pipe
    DatetimeStringPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatDialogModule,
  ],
  providers: [
  ],
  entryComponents: [
    ProfileEditorComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
