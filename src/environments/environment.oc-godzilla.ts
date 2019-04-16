import { Environment } from './environment.oc-minilla';
export const environment = {
  production: true,
  api: {
    protocol: 'https',
    hostname: 'ordiapi.net',
    port: 443,
  },
  ws: {
    protocol: 'wss',
    hostname: 'node.ordiws.net',
    port: 443,
  },
  bucket: 'oc-godzilla.appspot.com',
} as Environment;
