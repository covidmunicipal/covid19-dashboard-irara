import { version } from '../../package.json';

export const environment = {
  buildVersion: version,
  production: true,
  firebase: {
    apiKey: 'AIzaSyCy5bYwOvW0q6fK4bWua8oMXM1SAJXxzKQ',
    authDomain: 'covid19-municipal.firebaseapp.com',
    databaseURL: 'https://covid19-municipal.firebaseio.com',
    projectId: 'covid19-municipal',
    storageBucket: 'covid19-municipal.appspot.com',
    messagingSenderId: '886717395582',
    appId: '1:886717395582:web:09f26fde75c6aa9b315e2f',
    measurementId: 'G-9S7453NBQZ'
  }
};
