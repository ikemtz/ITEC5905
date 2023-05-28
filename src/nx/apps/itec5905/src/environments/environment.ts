// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { endpoints } from './endpoints';

export const environment = {
  production: false,
  version: '1.0.0',
  endpoints,
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
    strictActionSerializability: false,
    strictActionTypeUniqueness: true,
    strictStateSerializability: true,
  },
  appInsights: { instrumentationKey: 'e92419ad-e3e7-488a-81d4-794b498de73e' },
  oidc_options: {
    authority: '/auth',
    client_id: 'MWV0B0M77HrAU4ljYJgpq2PGBeOyTUBu',
    audience: 'ITEC5905',
    response_type: 'code',
    getUserMetadata: true,
    scope: 'openid email profile picture'
  },
  idleConfig: {
    timeoutWarningInMs: 540000, //9 minutes
    autoLogoutInMs: 600000, //10 minutes
  },
};
