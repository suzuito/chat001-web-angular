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
  MatTabsModule,
  MatMenuModule,
  MatSelectModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { HeaderSubMainComponent } from './header-sub-main/header-sub-main.component';
import { ButtonIconComponent } from './parts/button-icon/button-icon.component';
import { ProfileTextAllComponent } from './parts/profile-text-all/profile-text-all.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopComponent } from './top/top.component';
import { ProfileTextAllWithIconComponent } from './parts/profile-text-all-with-icon/profile-text-all-with-icon.component';
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
import { RoomInfoComponent } from './parts/room-info/room-info.component';
import { DatetimeStringPipe } from './pipe/date';
import { RoomMemberComponent } from './room/room-member/room-member.component';
import { RoomMessageComponent } from './room/room-message/room-message.component';
import { RoomInputterComponent } from './room/room-inputter/room-inputter.component';
import { RoomInfoEditorComponent } from './room/room-info-editor/room-info-editor.component';
import { PasswordInputterComponent } from './parts/password-inputter/password-inputter.component';
import { ListRoomMessageEachComponent } from './parts/list-room-message-each/list-room-message-each.component';
import { ProfileImgComponent } from './parts/profile-img/profile-img.component';
import { ListAgentInRoomComponent } from './parts/list-agent-in-room/list-agent-in-room.component';
import { RoomMemberSearchOptionComponent } from './room/room-member/room-member-search-option/room-member-search-option.component';
import { AgentNameDirective } from './parts/agent-name.directive';
import { AgentDescriptionDirective } from './parts/agent-description.directive';
import { ListAnyComponent } from './parts/list-any/list-any.component';
import { ProfileTextAllWithIcon2Component } from './parts/profile-text-all-with-icon2/profile-text-all-with-icon2.component';
import { RoomNameDirective } from './parts/room-name.directive';
import { RoomDescriptionDirective } from './parts/room-description.directive';
import { RoomProfileComponent } from './parts/room-profile/room-profile.component';
import { RoomPropertiesComponent } from './parts/room-properties/room-properties.component';
import { DialogProfileComponent } from './parts/dialog-profile/dialog-profile.component';
import { DialogRequesterComponent } from './parts/dialog-requester/dialog-requester.component';
import { RoomCreatorComponent } from './room-creator/room-creator.component';
import { DialogIntroducerComponent } from './parts/dialog-introducer/dialog-introducer.component';
import { RoomEntranceComponent } from './room-entrance/room-entrance.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { DialogPasswordInputterComponent } from './parts/dialog-password-inputter/dialog-password-inputter.component';
import { DialogConfirmerComponent } from './parts/dialog-confirmer/dialog-confirmer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMainComponent,
    HeaderSubMainComponent,
    ButtonIconComponent,
    ProfileTextAllComponent,
    SideMenuComponent,
    TopComponent,
    ProfileTextAllWithIconComponent,
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
    DatetimeStringPipe,
    RoomMemberComponent,
    RoomMessageComponent,
    RoomInputterComponent,
    RoomInfoEditorComponent,
    PasswordInputterComponent,
    ListRoomMessageEachComponent,
    ProfileImgComponent,
    ListAgentInRoomComponent,
    RoomMemberSearchOptionComponent,
    AgentNameDirective,
    AgentDescriptionDirective,
    ListAnyComponent,
    ProfileTextAllWithIcon2Component,
    RoomNameDirective,
    RoomDescriptionDirective,
    RoomProfileComponent,
    RoomPropertiesComponent,
    DialogProfileComponent,
    DialogRequesterComponent,
    RoomCreatorComponent,
    DialogIntroducerComponent,
    RoomEntranceComponent,
    ErrorComponent,
    DialogPasswordInputterComponent,
    DialogConfirmerComponent,
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
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [
  ],
  entryComponents: [
    ProfileEditorComponent,
    PasswordInputterComponent,
    DialogProfileComponent,
    DialogRequesterComponent,
    DialogIntroducerComponent,
    DialogPasswordInputterComponent,
    DialogConfirmerComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
