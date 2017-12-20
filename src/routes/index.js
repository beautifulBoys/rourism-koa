
import users from './users.js';
import client from './client.js';
import admin from './admin.js';

export default (app) => {
  app.use(users.routes(), users.allowedMethods());
  app.use(client.routes(), client.allowedMethods());
  app.use(admin.routes(), admin.allowedMethods());
};
