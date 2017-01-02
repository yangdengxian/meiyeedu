
var express = require('express');
var router = express.Router();
var shopDao = require('../dao/shopDao');
/* GET shops listing. 
*  
*  app.js 中注册路由配置代码 app.use('/shops', shops);
*
*  所以在请求用户的任何路径前都要添加 /shops 开始；
*/
router.get('/', function(req, res, next) {
    //模拟用户数组数据    
    shopDao.queryAll(req, res, next);
});

// 增加用户
//TODO 同时支持get,post
router.get('/add', function(req, res, next) {
    shopDao.add(req, res, next);
});

router.get('/queryById', function(req, res, next) {
    console.log('查询条件shop');
    shopDao.queryById(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    console.log('查询所有shop');
    shopDao.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
    shopDao.queryById(req, res, next);
});

router.get('/querySql', function(req, res, next) {
    shopDao.querySql(req, res, next);
});

router.get('/deleteshop', function(req, res, next) {
    shopDao.delete(req, res, next);
});

router.post('/updateshop', function(req, res, next) {
    shopDao.update(req, res, next);
});


module.exports = router;
