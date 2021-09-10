// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAm29zK7blzQh_2Fwtbesjjp9Ql2avM8os",
    authDomain: "kids-9998d.firebaseapp.com",
    projectId: "kids-9998d",
    storageBucket: "kids-9998d.appspot.com",
    messagingSenderId: "610041963781",
    appId: "1:610041963781:web:85bbc8b8a2b443dc1e036c",
    database: "https://kids-9998d-default-rtdb.firebaseio.com",
    subscriptions: "subs"
  },
  paypalSubscriptionApi: "https://api.sandbox.paypal.com/v1/billing/subscriptions",
  paypalBasicAuth: "Basic QWNRN0dTT3cybDVZYU5iQkVZOWFlNHRfM0docFpqMG8tS2FfU1lEcTFPVEhka3pyc2c0Qmh4dkYzTEYweXFsU0hqWGplamJBd25qYlJ5OEg6RUhPUHE5UVp5SlV1b0RUZjE2UHhsdUV0SjZjVjRhcGtmeVhWTlA3aEJGdEtyU1dROGVlbHYxQTJaRExYdWwxYUk0Q1FaY0FUV0oyeVpCTlE=",
  paypalMonthlyPlanId: "P-3460927120593582CMEQV6GA",
  paypalHalfYearlyPlanId: "P-1PH056916C2408545MEQWCJQ",
  paypalYearlyPlanId: "P-9A167177PG454172PMEQWC2A",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
