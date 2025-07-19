import React, { useEffect } from "react";
import keycloak from "./keycloak";
import { useDispatch } from "react-redux";
import { setAuth } from "./features/auth/authSlice";

const KeycloakProviderWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", pkceMethod: "S256" })
      .then((authenticated) => {
        if (authenticated) {
          dispatch(
            setAuth({
              keycloak,
              token: keycloak.token,
              user: keycloak.tokenParsed,
            })
          );
        }
      })
      .catch(console.error);
  }, [dispatch]);

  return <>{children}</>;
};

export default KeycloakProviderWrapper;
