import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplesComponent } from './examples/examples.component';
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
        path: 'room/:roomId',
        component: RoomComponent,
        resolve: {
          initRoom: RoomResolverService,
        },
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
    path: 'examples',
    component: ExamplesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
