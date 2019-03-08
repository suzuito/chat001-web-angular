import { Agent } from './agent';

export const testAgents: Agent[] = ((): Agent[] => {
  const ret: Agent[] = [];
  for (let i = 0; i < 100; i++) {
    ret.push({
      id: `agent${i}`,
      name: `agent${i}_name`,
      maxOwnedRoom: 10,
      externalId: `agent${i}_externalId`,
      color: '#000000',
      description: `agent${i}_description`,
    });
  }
  return ret;
})();
