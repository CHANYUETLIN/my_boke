const { response } = require('express');
var express = require('express');
var router = express.Router();
const {login} = require('../service/userService')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',(req,res)=>{
  // 获取到客户端传过来的参数
  // 获取post请求，消息体里面的信息 get请求 req.query
  const data = req.query
  // 调用业务层
  // 如果要响应内容回客户端，使用send()
  return new Promise((res,rej)=>{
    login(res,data)
  }).then((result)=>{
    return res.send(result)
  })
  
})

module.exports = router;
