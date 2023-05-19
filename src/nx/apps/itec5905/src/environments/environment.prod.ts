import { endpoints } from './endpoints';


export const environment = {
  production: true,
  version: '1.0.0',
  endpoints,
  runtimeChecks: {
    strictActionImmutability: false,
    strictStateImmutability: false,
    strictActionSerializability: false,
    strictActionTypeUniqueness: false,
    strictStateSerializability: false,
  },
  oidc_options: {
    authority: 'https://itec5905.us.auth0.com',
    client_id: 'MWV0B0M77HrAU4ljYJgpq2PGBeOyTUBu',
    audience: 'ITEC5905',
    response_type: 'code',
    getUserMetadata: true,
  },
  idleConfig: {
    timeoutWarningInMs: 540000, //9 minutes
    autoLogoutInMs: 600000, //10 minutes
  },
};
