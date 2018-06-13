const admin = require('./admin')

module.exports = (app) => {
  app.use(admin.routes(), admin.allowedMethods())
}
