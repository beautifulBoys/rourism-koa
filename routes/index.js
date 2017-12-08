
import users from './users.js';

export default (app) => {
  app.use(users.routes(), users.allowedMethods());
};
