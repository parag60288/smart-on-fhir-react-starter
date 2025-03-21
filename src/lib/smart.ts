import FHIR from 'fhirclient';

// Configuration for different FHIR servers
const serverConfigs = {
  epic: {
    responseType: 'code',
    pkceEnabled: true,
  },
  cerner: {
    responseType: 'code',
    pkceEnabled: true,
  }
};

// Default to Epic, but can be changed based on the server being used
const defaultServer = 'epic';

export const smartConfig = {
  clientId: 'my-client-id', // Replace with your client ID for the respective server
  scope: 'launch/patient patient/*.read',
  redirectUri: window.location.origin + '/launch-callback',
  ...serverConfigs[defaultServer],
};

export const initializeFhirClient = (server: 'epic' | 'cerner', launchParam: string, iss: string) => {
  const config = {
    ...smartConfig,
    ...serverConfigs[server],
    launch: launchParam,
    iss: iss,
  };
  return FHIR.oauth2.authorize(config);
};

export const getFhirClient = () => {
  return FHIR.oauth2.ready();
}; 