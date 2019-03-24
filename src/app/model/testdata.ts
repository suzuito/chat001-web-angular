import { Room, RoomStatus, AgentInRoom, AgentRoleInRoom, emptyRoom } from './room';
import { AgentMessage, LineType } from './agent_message';
import { AgentService } from '../agent.service';
import { RoomMessageService } from '../room-message.service';
import { RoomMessage, MessageType } from './room_message';
import { RoomSearchOptionNull } from '../rooms/rooms-search-option/rooms-search-option.service';
import { EasyAgent, AvatarType } from './agent';
import { DataEasyAgentsService } from '../data-easy-agents.service';
import { DataRoomsService } from '../data-rooms.service';
import { DataAgentsInRoomService } from '../data-agents-in-room.service';
import { ProfileImageSize } from '../parts/profile-img/profile-img.component';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomBoolean(): boolean {
  return getRandomInt(2) % 2 === 0;
}

function randomImage(i: number): string {
  return `https://picsum.photos/300/300/?image=${i}`;
}

export function setTestAgent(s: AgentService) {
  s.set({
    id: `agent00001`,
    externalId: `ext_agent00001`,
    name: `ケンシロウ aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
    maxOwnedRoom: 10,
    description: `お前はもう死んでいる.........。...今日より明日......。久しぶりに人間にあった気がする...。`,
    updatedAt: getRandomInt(10000000000),
    accessedAt: getRandomInt(10000000000),
    avatarType: AvatarType.Default,
    isPublic: true,
  });
  for (let i = 0; i < 5; i++) {
    const r = emptyRoom(`room${i}`, `room${i}`, `room${i}_Desc`, 100);
    s.setRoom(
      {
        room: r,
        role: AgentRoleInRoom.Member,
        createdAt: 0,
        updatedAt: 0,
      },
    );
  }
}

export function setTestAgents(s: DataEasyAgentsService) {
  const ret: EasyAgent[] = [];
  for (let i = 0; i < 100; i++) {
    ret.push({
      externalId: `temporaryAgent${i}`,
      name: `temporaryAgent${i}_name Where did you get the indeterminateChange event from?`,
      description: `temporaryAgent${i}_description Use MatSelectionList's selectionChange event.`,
      updatedAt: getRandomInt(10000000000),
      accessedAt: getRandomInt(10000000000),
      avatarType: AvatarType.Default,
    });
  }
  s.setAgent(...ret);
}

const defaultMaxAgents = 100;

export function setTestRooms(s: DataRoomsService, s2: DataAgentsInRoomService, s3: DataEasyAgentsService) {
  for (let i = 0; i < 100; i++) {
    const roomId = `room${i}`;
    s.setRoom({
      id: roomId,
      name: `room${i}_name Where did you get the indeterminateChange event from?`,
      description: `room${i}_description Use MatSelectionList's selectionChange event.`,
      maxAgents: defaultMaxAgents,
      status: RoomStatus.Active,
      public: randomBoolean(),
      fixed: randomBoolean(),
      agents: getRandomInt(defaultMaxAgents),
      password: randomBoolean(),
      createdAt: getRandomInt(10000000000),
    });
    const n = getRandomInt(100) + 1;
    for (let j = 0; j < n; j++) {
      const agent: EasyAgent = {
        externalId: `extId-${roomId}-${j}`,
        name: `agent${j}_name Where did you get the indeterminateChange event from?`,
        description: `agent${j}_description Use MatSelectionList's selectionChange event.`,
        updatedAt: getRandomInt(10000000000),
        accessedAt: getRandomInt(10000000000),
        avatarType: AvatarType.Custom,
      };
      s2.setAgentInRoom(roomId, {
        role: AgentRoleInRoom.Member,
        createdAt: getRandomInt(10000000000),
        updatedAt: getRandomInt(10000000000),
        deletedAt: 0,
        externalID: agent.externalId,
      });
      s3.setAgent(agent);
    }
  }
}

export function setTestAgentMessages(s: AgentService): void {
  const ret: AgentMessage[] = [];
  for (let i = 0; i < 100; i++) {
    ret.push({
      id: `agentMessage${i}`,
      lines: [
        { type: LineType.Text, body: `${i}: Hello world` },
        { type: LineType.Text, body: 'Hi there' },
      ],
      read: randomBoolean(),
      createdAt: getRandomInt(10000000000),
    });
  }
  s.setMessage(...ret);
}

export function setTestRoomMessages(s: RoomMessageService, d: DataAgentsInRoomService, d2: DataRoomsService): void {
  const rooms = d2.filter(RoomSearchOptionNull, true);
  rooms.forEach((room: Room) => {
    const agents = d.getParent(room.id);
    for (let i = 0; i < agents.length; i++) {
      const agentI = getRandomInt(agents.length);
      s.pushMessage(room.id, {
        id: `message${room.id}.${i}`,
        body: `message${room.id}.${i}.body: 今後ジョブの中間出力に対してデフォルトで zstd による圧縮を適用させるための設定変更メンテナンスを実施予定です。
        zstd デフォルト化後にジョブが実行できなくなる可能性を事前に排除するため、下記の2点に関してご確認いただくようお願い致します。`,
        agentExternalId: agents[agentI].externalID,
        type: MessageType.Message,
        createdAt: getRandomInt(10000000000),
        extra: {},
      });
    }
  });
}
