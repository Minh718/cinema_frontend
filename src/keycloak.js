import Keycloak from 'keycloak-js';
import { URL_KEYCLOACK, CLIENID_KEYCLOACK, REALM_KEYCLOACK } from "./constants/baseURL";
const keycloak = new Keycloak({
    url: URL_KEYCLOACK, // Keycloak base URL
    realm: REALM_KEYCLOACK,              // Your realm name
    clientId: CLIENID_KEYCLOACK,          // Your client ID
});

export default keycloak;

