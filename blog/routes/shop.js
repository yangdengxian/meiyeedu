var express = require('express');
var router = express.Router();
var shopDao = require('../dao/shopDao');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('shopIndex',{title:'商家店铺信息'});
});

router.get('/peritem', function(req, res, next) {
   res.render('peritem',{title:'优惠套餐信息'});
});

router.get('/personyy', function(req, res, next) {
   res.render('personyy',{title:'预约信息'});
});

router.get('/preferinfo', function(req, res, next) {
   res.render('preferinfo',{title:'优惠时间'});
});

router.post('/index/list', function(req, res, next) {
    shopDao.queryAll(req, res, next);
});

router.post('/index/listChild', function(req, res, next) {
    shopDao.queryById(req, res, next);
});

router.post('/index/add',function(req,res,next){	
	shopDao.add(req, res, next);
});

router.post('/index/delete',function(req,res,next){
	shopDao.delete(req, res, next);
})

router.post('/index/edit',function(req,res,next){
	shopDao.update(req, res, next);
})

module.exports = router;
