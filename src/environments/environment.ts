// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appUrl: 'http://localhost:8080',
  firebaseConfig: {
   apiKey: "AIzaSyB8a_25DsWHoFTOQJ9w3zCs4MHw1gR9Zdg",
    authDomain: "anorpsearch.firebaseapp.com",
    databaseURL: "https://anorpsearch.firebaseio.com",
    projectId: "anorpsearch",
    storageBucket: "",
    messagingSenderId: "489237620426",
    appId: "1:489237620426:web:5d876f775dad9093"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
