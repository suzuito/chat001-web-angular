import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { AgentsComponent } from './agents/agents.component';
import { AppRootComponent } from './app-root/app-root.component';
import { AgentMessagesComponent } from './agent-messages/agent-messages.component';
import { RoomComponent } from './room/room.component';
import { RoomResolverService } from './room/room-resolver.service';
import { RoomInfoEditorComponent } from './room/room-info-editor/room-info-editor.component';
import { RoomMemberComponent } from './room/room-member/room-member.component';
import { RoomMessageComponent } from './room/room-message/room-message.component';
import { RoomCreatorComponent } from './room-creator/room-creator.component';
import { RoomCandeactivateService } from './room/room-candeactivate.service';
import { RoomEntranceComponent } from './room-entrance/room-entrance.component';
import { RoomEntranceResolverService } from './room-entrance/room-entrance-resolver.service';
import { AppRootResolverService } from './app-root/app-root-resolver.service';
import { ErrorComponent } from './error/error.component';
import { ProfileAvatarEditorComponent } from './profile-avatar-editor/profile-avatar-editor.component';
import { InitComponent } from './init/init.component';
import { ExampleComponent } from './example/example.component';
import { DeactivateProfileAvatarEditorGuard } from './profile-avatar-editor/deactivate-profile-avatar-editor.guard';

const routes: Routes = [
  {
    path: '', component: AppRootComponent,
    resolve: {
      doneInit: AppRootResolverService,
    },
    children: [
      {
        path: '',
        component: RoomsComponent,
      },
      {
        path: 'rooms',
        component: RoomsComponent,
      },
      {
        path: 'agents',
        component: AgentsComponent,
      },
      {
        path: 'agents/avatar',
        component: ProfileAvatarEditorComponent,
        canDeactivate: [DeactivateProfileAvatarEditorGuard],
      },
      {
        path: 'agent-messages',
        component: AgentMessagesComponent,
      },
      {
        path: 'room-creator',
        component: RoomCreatorComponent,
      },
      {
        path: 'room-entrance/:roomId',
        component: RoomEntranceComponent,
        resolve: {
          initRoom: RoomEntranceResolverService,
        },
      },
      {
        path: 'room/:roomId',
        component: RoomComponent,
        resolve: {
          initRoom: RoomResolverService,
        },
        canDeactivate: [
          RoomCandeactivateService,
        ],
        children: [
          {
            path: '',
            component: RoomMessageComponent,
          },
          {
            path: 'member',
            component: RoomMemberComponent,
          },
          {
            path: 'info',
            component: RoomInfoEditorComponent,
          }
        ],
      },
    ],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'init',
    component: InitComponent,
  },
  {
    path: 'example',
    component: ExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
