
import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import KoaStatic from 'koa-static';
import fs from 'fs';
import path from 'path';

import router from './routes/index.js';
import dbconnect from './config/db.js';

const app = new Koa();

// error handler
onerror(app);

// db 数据库
dbconnect();

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(logger());
app.use(json());
app.use(KoaStatic(path.join(__dirname, '../public')));
// routes
router(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
