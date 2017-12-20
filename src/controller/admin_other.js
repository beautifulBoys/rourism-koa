import path from 'path';
import {china} from '../data/city.js';
import User from '../model/user.js';

export const getCityDataFunc = async (req, res) => {
  res.send({code: 200, message: '获取城市数据成功', data: china});
};

// 统一身份验证
export const authenticationFunc = async (ctx, next) => {
  const ignoreList = [
    '/admin/login',
    '/admin/map',
    '/admin/download'
  ];
  console.log(ctx);
  if (ignoreList.indexOf(ctx.path) !== -1) {
    next();
    return;
  }
  let passport = ctx.headers.passport;
  let userId = ctx.headers.userid - 0;
  try {
    let result = await User.findOne({id: userId});
    if (result && result.passport && passport === result.passport) {
      next();
    } else {
      ctx.body = {code: 400, message: '身份验证失败', data: {}};
      // res.send({code: 400, message: '身份验证失败', data: {}});
      return;
    }
  } catch (err) {
    ctx.body = {code: 400, message: '此账号验证异常，请重新登录', data: {}};
    // res.send({code: 400, message: '此账号验证异常，请重新登录', data: {}});
  }
};

export const mapFunc = async (req, res, next) => {

  try {
    let result = await User.find({});
    let count = result.length;
    let obj = {};
    for (let i = 0; i < count; i++) {
      if (result[i].address.length > 0) {
        if (obj[result[i].address[0]]) obj[result[i].address[0]]++;
        else obj[result[i].address[0]] = 1;
      } else {
        if (obj['未知']) obj['未知']++;
        else obj['未知'] = 1;
      }
    }
    let arr = [];
    for (let k in obj) {
      arr.push({
        name: k,
        value: obj[k],
        rate: obj[k] / count
      });
    }
    res.send({code: 200, message: '数据查询成功', data: arr});
  } catch (err) {
    res.send({code: 400, message: '数据查询失败', data: {}});
  }
};

export const downloadFunc = async (req, res, next) => {
  res.download(path.join(__dirname, '../../resource/Desert.jpg'), 'Desert.jpg', (err) => {
    if (err) console.log(err);
    else console.log('没有错误');
  });
};