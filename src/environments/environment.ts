import { Environment } from './environment.oc-minilla';
export const environment = {
  production: false,
  api: {
    protocol: 'http',
    hostname: '192.168.11.5',
    port: 8085,
  },
  ws: {
    protocol: 'ws',
    hostname: '192.168.11.5',
    port: 8086,
  },
  bucket: 'ocd12345',
} as Environment;
