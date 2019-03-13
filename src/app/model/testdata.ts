import { Agent, TemporaryAgent } from './agent';
import { Room, RoomStatus, AgentInRoom, AgentRoleInRoom } from './room';
import { AgentMessage, LineType } from './agent_message';
import { DataService } from '../data.service';
import { AgentService } from '../agent.service';
import { RoomMessageService } from '../room-message.service';
import { RoomMessage, MessageType } from './room_message';
import { RoomSearchOptionNull } from '../rooms/rooms-search-option/rooms-search-option.service';

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
    name: `ケンシロウ`,
    maxOwnedRoom: 10,
    color: '#000000',
    description: `お前はもう死んでいる.........。...今日より明日......。久しぶりに人間にあった気がする...。`,
    updatedAt: getRandomInt(10000000000),
    urlImage: 'https://dic.nicovideo.jp/oekaki/21598.png',
  });
}

export function setTestTemporaryAgents(s: DataService) {
  const ret: TemporaryAgent[] = [];
  for (let i = 0; i < 100; i++) {
    ret.push({
      id: `temporaryAgent${i}`,
      name: `temporaryAgent${i}_name Where did you get the indeterminateChange event from?`,
      color: '#000000',
      description: `temporaryAgent${i}_description Use MatSelectionList's selectionChange event.`,
      updatedAt: getRandomInt(10000000000),
      urlImage: randomImage(i),
    });
  }
  s.setTemporaryAgent(...ret);
}

const defaultMaxAgents = 100;

export function setTestRooms(s: DataService) {
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
      s.setAgentInRoom(roomId, {
        externalId: `extId-${roomId}-${j}`,
        role: AgentRoleInRoom.Member,
        createdAt: getRandomInt(10000000000),
        updatedAt: getRandomInt(10000000000),
        deletedAt: 0,
        agent: {
          name: `agent${j}_name Where did you get the indeterminateChange event from?`,
          color: '#000000',
          description: `agent${j}_description Use MatSelectionList's selectionChange event.`,
          updatedAt: getRandomInt(10000000000),
          urlImage: randomImage(j),
        },
      });
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

export function setTestRoomMessages(s: RoomMessageService, d: DataService): void {
  const rooms = d.filterRoom(RoomSearchOptionNull);
  rooms.forEach((room: Room) => {
    const agents = d.getAgentsInRoom(room.id);
    for (let i = 0; i < 100; i++) {
      const agentI = getRandomInt(agents.length);
      s.pushMessage(room.id, {
        id: `message${room.id}.${i}`,
        body: `message${room.id}.${i}.body: 今後ジョブの中間出力に対してデフォルトで zstd による圧縮を適用させるための設定変更メンテナンスを実施予定です。
        zstd デフォルト化後にジョブが実行できなくなる可能性を事前に排除するため、下記の2点に関してご確認いただくようお願い致します。`,
        agentExternalId: agents[agentI].externalId,
        type: MessageType.Message,
        createdAt: getRandomInt(10000000000),
        extra: {},
      });
    }
  });
}
