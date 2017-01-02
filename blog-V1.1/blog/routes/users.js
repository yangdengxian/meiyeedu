
var express = require('express');
var router = express.Router();
var userDao = require('../dao/users/userDao');
/* GET users listing. 
*  
*  app.js 中注册路由配置代码 app.use('/users', users);
*
*  所以在请求用户的任何路径前都要添加 /users 开始；
*/
router.get('/', function(req, res, next) {
    //模拟用户数组数据    
    userDao.queryAll(req, res, next);
});

// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

router.get('/queryById', function(req, res, next) {
    console.log('查询条件user');
    userDao.queryById(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    console.log('查询所有user');
    userDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});


module.exports = router;
