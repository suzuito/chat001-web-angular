import { Environment } from './environment.oc-minilla';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    protocol: 'http',
    hostname: '192.168.153.245',
    port: 8085,
  },
  ws: {
    protocol: 'ws',
    hostname: '192.168.153.245',
    port: 8086,
  },
  bucket: 'ocd12345',
} as Environment;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
