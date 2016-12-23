var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/query', function (req, res, next) {  
  console.log('get请求参数对象 :',req.query);  
  console.log('post请求参数对象 :',req.body);  
  console.log('q的值为 :',req.query.q);  
    
});  

router.post('/body', function (req, res, next) {  
  console.log('get请求参数对象 :',req.query);  
  console.log('post请求参数对象 :',req.body);  
  console.log('q的值为 :',req.body.q);  
    
});

module.exports = router;
