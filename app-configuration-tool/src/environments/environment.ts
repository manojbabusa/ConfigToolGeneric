// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adalConfig: {
    tenant: '3b27d02e-0ad3-4e02-947d-dd47cf86624f',
    //clientId: '62374115-36a3-4cfa-a2ce-03ef0f2816be',
    clientId:'e5ad3d77-0d56-42dc-b542-0fd8371a2a93',
    redirectUri: window.location.origin,
    cacheLocation: 'localStorage',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
