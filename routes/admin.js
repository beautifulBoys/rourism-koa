const router = require('koa-router')()

router.prefix('/admin')

router.get('/', (ctx, next) => {
  console.log(ctx.query)
  ctx.redirect('http://www.baidu.com')
  // ctx.body = 'this is a users response!'
})

router.post('/bar', (ctx, next) => {
  ctx.body = {
    test: 'lixin'
  }
})

module.exports = router
