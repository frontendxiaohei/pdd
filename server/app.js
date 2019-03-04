const express = require('express');
const path =  require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
// const conn = require('./../db/db');
const indexRouter = require('./routes/index');

let app = express();
app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    next();
});
app.use(session({
    secret: '123456', // 对session id相关的cookie 进行签名
    resave: false,
    saveUninitialized: true, // 是否保存未初始化的对话
    cookie: {maxAge: 1000 * 60 * 60 * 24}, // 设置session的有效时间,单位毫秒
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',indexRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.listen('3000',function () {
  console.log('>listening on 3000')
});
