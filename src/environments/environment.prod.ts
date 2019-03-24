import { Environment } from './environment.oc-minilla';

export const environment = {
  production: true,
  api: {
    protocol: 'https',
    hostname: 'dummy',
    port: 443,
  },
  ws: {
    protocol: 'wss',
    hostname: 'dummy',
    port: 443,
  },
  bucket: 'ocg12345',
} as Environment;
