const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  console.log(ctx.req.headers);
  ctx.body = {a: 'sdflsjkfsdlfjdslfjlsdjflsdkjflk', ctx};
})

module.exports = router;
