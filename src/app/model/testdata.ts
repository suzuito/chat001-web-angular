import { Agent } from './agent';
import { Room, RoomStatus } from './room';
import { AgentMessage, LineType } from './agent_message';
import { DataService } from '../data.service';
import { AgentService } from '../agent.service';
import { RoomMessageService } from '../room-message.service';
import { RoomMessage, MessageType } from './room_message';
import { RoomSearchOptionNull } from '../rooms/rooms-search-option/rooms-search-option.service';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomBoolean() {
  return getRandomInt(2) % 2 === 0;
}

export function setTestAgents(s: DataService) {
  const ret: Agent[] = [];
  for (let i = 0; i < 100; i++) {
    ret.push({
      id: `agent${i}`,
      name: `agent${i}_name Where did you get the indeterminateChange event from?`,
      maxOwnedRoom: 10,
      externalId: `agent${i}_externalId`,
      color: '#000000',
      description: `agent${i}_description Use MatSelectionList's selectionChange event.`,
      updatedAt: getRandomInt(10000000000),
    });
  }
  s.setAgent(...ret);
}

const defaultMaxAgents = 100;

export function setTestRooms(s: DataService) {
  const ret: Room[] = [];
  for (let i = 0; i < 100; i++) {
    ret.push({
      id: `room${i}`,
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
  }
  s.setRoom(...ret);
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
    for (let i = 0; i < 100; i++) {
      s.pushMessage(room.id, {
        id: `message${room.id}.${i}`,
        body: `message${room.id}.${i}.body`,
        agentName: `message${room.id}.${i}.agentName`,
        agentExternalId: `message${room.id}.${i}.agentExternalId`,
        agentColor: `message${room.id}.${i}.agentColor`,
        type: MessageType.Message,
        createdAt: getRandomInt(10000000000),
        extra: {},
      });
    }
  });
}
