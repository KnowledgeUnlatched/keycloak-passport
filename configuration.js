module.exports = class KeycloakEnvConfig {
  constructor(inputOptions) {
    const defaultOptions = {
      host: process.env.KEYCLOAK_HOST,
      realm: process.env.KEYCLOAK_REALM,
      clientID: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      callbackURL: process.env.SITE_URL,
      scope: "openid",
      additionalClaims: [],
      skipPrefix: true,
    };
    const options = Object.assign(defaultOptions, inputOptions);
    this.update(options);
  }

  update(options) {
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    this.prefix = (this.skipPrefix ? "" : "/auth")
    this.mainURL = `${this.host}${this.prefix}/realms/${this.realm}/protocol/openid-connect`
    this.authorizationURL = `${this.mainURL}/auth`;
    this.tokenURL = `${this.mainURL}/token`;
    this.userInfoURL = `${this.mainURL}/userinfo`;
    this.logOutURL = `${this.mainURL}/logout`;
  }
};