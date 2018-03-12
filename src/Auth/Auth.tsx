import history from '../history';
// import auth0 from 'auth0-js';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {

  // auth0: auth0.Authentication = new auth0.WebAuth({
  auth0: auth0.WebAuth = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login(): void {
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err: auth0.Auth0Error, authResult: auth0.Auth0DecodedHash) => {
      // if (authResult && authResult.accessToken && authResult.idToken) {
      if (authResult && authResult.accessToken && authResult.idToken && authResult.expiresIn ) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        // console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  // setSession(authResult: auth0.Auth0DecodedHash): void {
  setSession(authResult: auth0.Auth0DecodedHash): void {
    // Set the time that the access token will expire at
    // Object is possibly 'undefined'.
    // https://github.com/Microsoft/TypeScript/issues/8736 
    if (authResult && authResult.accessToken && authResult.idToken && authResult.expiresIn ) {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/home');
    }
  }

  logout(): void {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the 
    // access token's expiry time
    // Argument of type 'string | null' is not assignable to parameter of type 'string'.
    // Type 'null' is not assignable to type 'string'.
    const item = localStorage.getItem('expires_at');
    if (item) {
      let expiresAt = JSON.parse(item);
      return new Date().getTime() < expiresAt;
    } else {
      return false;
    }
  }
}
