import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './top/top.component';
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

const routes: Routes = [
  {
    path: '', component: AppRootComponent,
    children: [
      {
        path: '',
        component: TopComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
