import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Context from "./context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-zw5idfxv.us.auth0.com"
    clientId="J7hMLro4i7Qf62DOqWiqYq6AxTzXwT70"
    redirectUri={window.location.origin}>
    <Context>
      <App />
    </Context>
    </Auth0Provider>
  

);
