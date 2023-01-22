// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
export const path = {
  endPoint: 'http://192.168.1.151:3001'
};

export const config = {
  endPoint: path.endPoint,
  host: '192.168.1.151',
  rememberMe: false,
  appName: 'app_xyz',
  imagesStorage: path.endPoint+'/images',
  localImagesPath: 'assets/img'
}
