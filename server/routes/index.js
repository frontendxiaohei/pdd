const express = require('express');
const router = express.Router();
const conn = require("../db/db");
const recommendArr = require('./../data/recommend').data;
const sms_util = require('./../util/sms_util');
const svgCaptcha = require('svg-captcha')



let users = {}
/**
 * 获取推荐商品列表
 * 1,20
 */
router.get('/api/recommendshoplist', (req, res) => {
    // 1.0 获取参数
    let pageNo = req.query.page || 1;
    let pageSize = req.query.count || 20;
    console.log(pageNo)
    console.log(pageSize)
    //1.1 数据库查询语句
    let sqlStr = 'SELECT * from pdd_recommend LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
    // 1.2 执行语句
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'})
        } else {
            setTimeout(() => {
                res.json({success_code: 200, message: results})
            }, 100)
        }
    })

});

/*
* 一次性图形验证码
* */
router.get('/api/captcha', (req, res) => {
    //1生成随机验证码
    let captcha = svgCaptcha.create({
        color: false,
        noise: 3,
        ignoreChars: 'oilOIL0',
        size: 4,
        background: 'yellowgreen'
    })
    // 2.保存
    req.session.captcha = captcha.text.toLowerCase()
    // 3. 返回客户端
    res.type('svg');
    res.send(captcha.data)
});
/**
 * 发送验证码短信
 * */
router.get('/api/send_code', (req, res) => {
    //1.获取手机号码
    let phone = req.query.phone
    // 2.验证码
    let code = sms_util.randomCode(6)
    /* sms_util.sendCode(phone, code, function (success) {
         if (success) {
             users[phone] = code
             res.json({success_code: 200, message: '验证码获取成功'})
         } else {
             res.json({err_code: 0, message: '验证码获取失败'})
         }
     })*/

    setTimeout(() => {
        // 成功
        users[phone] = code
        res.json({success_code: 200, message: code})
        // res.json({err_code: 0, message: '验证码获取失败'})
    }, 100)
    // 失败
    // res.json({err_code: 0, message: '验证码获取失败'})
})
/*
手机验证码登陆
* */
router.post('/api/login_code', (req, res) => {
    //1.获取数据
    const phone = req.body.phone;
    const code = req.body.code;
    //2.验证验证码是否正确
    if (users[phone] !== code) {
        res.json({err_code: 0, message: '验证码不正确'})
        return;
    }
    //3.查询数据
    delete users[phone];
    //3.1查询语句
    let sqlStr = "SELECT * from pdd_user_info where user_phone = '" + phone + "'LIMIT 1"
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'})
        } else {
            results = JSON.parse(JSON.stringify(results))
            if (results[0]) { // 用户已经存在
                // console.log(results[0])
                req.session.userId = results[0].id
                // 返回数据给客户端
                res.json({
                    success_code: 200,
                    message: results[0]
                })
            } else { // 新用户
                const addSql = "INSERT INTO pdd_user_info(user_name, user_phone) values(?,?)"
                const addSqlParams = [phone, phone]
                conn.query(addSql, addSqlParams, (error, results, fiels) => {
                    results = JSON.parse(JSON.stringify(results))
                    if (!error) {
                        req.session.userId = results.insertId
                        let sqlStr = "SELECT * from pdd_user_info where id = '" + results.insertId + "'LIMIT 1"
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'})
                            } else {
                                results = JSON.parse(JSON.stringify(results))
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: results[0]
                                })
                            }
                        })
                    }
                })
            }
        }
    })
})

/* 用户名和密码登陆 */
router.post('/api/login_pwd', (req, res) => {
    //1.获取数据
    const user_name = req.body.name;
    const user_pwd = req.body.pwd;
    const captcha = req.body.captcha.toLowerCase()
    // console.log(captcha, req.session.captcha,req.session)
    //2.验证图形验证码是否正确
    if (captcha != req.session.captcha) {
        res.json({err_code: 0, message: '图形验证码不正确'})
        return
    }
    delete req.session.captcha;

    //3.查询数据
    //3.1查询语句
    let sqlStr = "SELECT * from pdd_user_info where user_name = '" + user_name + "'LIMIT 1"
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '用户名不正确'})
        } else {
            results = JSON.parse(JSON.stringify(results))
            if (results[0]) { // 用户已经存在
                // 验证密码是否正确
                if (results[0].user_pwd !== user_pwd) {
                    res.json({err_code: 0, message: '密码不正确'})
                } else {
                    req.session.userId = results[0].id;
                    // 返回数据给客户端
                    res.json({
                        success_code: 200,
                        message: results[0],
                        info: '登陆成功!'
                    })
                }
            } else { // 新用户
                const addSql = "INSERT INTO pdd_user_info(user_name, user_pwd) values(?,?)"
                const addSqlParams = [user_name, user_pwd]
                conn.query(addSql, addSqlParams, (error, results, fiels) => {
                    results = JSON.parse(JSON.stringify(results))
                    // console.log(results)
                    if (!error) {
                        req.session.userId = results.insertId
                        let sqlStr = "SELECT * from pdd_user_info where id = '" + results.insertId + "'LIMIT 1"
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'})
                            } else {
                                results = JSON.parse(JSON.stringify(results))
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: results[0]
                                })
                            }
                        })
                    }
                })
            }
        }
        console.log(req.session)
    })
})


module.exports = router;
