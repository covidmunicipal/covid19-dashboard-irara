// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  buildVersion: 'debug',
  production: false,
  firebase: {
    apiKey: 'AIzaSyCy5bYwOvW0q6fK4bWua8oMXM1SAJXxzKQ',
    authDomain: 'covid19-municipal.firebaseapp.com',
    databaseURL: 'https://covid19-municipal.firebaseio.com',
    projectId: 'covid19-municipal',
    storageBucket: 'covid19-municipal.appspot.com',
    messagingSenderId: '886717395582',
    appId: '1:886717395582:web:09f26fde75c6aa9b315e2f',
    measurementId: 'G-9S7453NBQZ'
  },
  spreadsheetId: '1-a543uhVSRItc7P4tZPiHBvz5bwUH0zQLn5b8hNbehg',
  appName: 'Radar Coronavírus Irará',
  targetLocation: 'Irará'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
