export interface Environment {
  production: boolean;
  api: URL;
  ws: URL;
}

export interface URL {
  protocol: string;
  hostname: string;
  port: number;
}

export const environment = {
  production: true,
  api: {
    protocol: 'https',
    hostname: 'oc-minilla.appspot.com',
    port: 443,
  },
  ws: {
    protocol: 'wss',
    hostname: 'node.ordiws-stg.net',
    port: 443,
  },
} as Environment;
