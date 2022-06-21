const { response } = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../Dao/dbUtil')
const {login} = require('../service/userService')
var multiparty = require('multiparty');//获取上传的图片功能

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



// 用户个人信息查询（根据用户名查询）
router.post('/QueryUserInfo',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      // 查询是否有重复的用户名
      connection.query(`SELECT * from user where username='${data.username}'`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          if(res1.length){
            res.send({
              code:'200',
              msg:"查询成功",
              result:res1,
            })
          }
        }
      })
    }
  });
})

// 用户个人信息修改
router.post('/UpdateUserInfo',(req,res)=>{
  let data = req.body
  connection.getConnection((err)=>{
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      connection.query(`update user set nickname='${data.nickname}', sex=${data.sex}, email='${data.email?data.email:''}', phone='${data.phone?data.phone:''}', described='${data.described?data.described:''}', url='${data.url?data.url:''}' WHERE username='${data.username}'`,(err,res1)=>{
        if(err){
          console.log("数据库更新失败",err)
          res.send({
            code:'400',
            msg:"更新失败,请咨询管理员",
          })
        }else{
          res.send({
            code:'200',
            msg:"更新成功"
          })
        }
      })
    }
  })
})

// 更新个人资料--头像上传
router.post('/InsertheadImg',(req,res)=>{
  // let username = req.body[1]
  // 要返回的 json 数据
  var myResult = {
    // versionName: '4.1.6',
    // versionCode: '340',
    // status: '0', // 响应状态 0-成功，非0-错误码
    // errorMessage: '成功',
    // exception: 'xxxxxx', // 异常描述
    result: [{}]
  };
  var form = new multiparty.Form();
  form.uploadDir='public/images'; //上传图片保存的地址(目录必须存在)
  form.parse(req, function(err, fields, files) { // 1、fields:获取表单的数据 2、files：图片上传成功返回的信息
    myResult.result[0].code = "200"; 
    myResult.result[0].message="success"; 
    console.log(fields,files,'files')
    myResult.result[0].imgUrl='http://localhost:8888/'+files.file[0].path;
    var url='http://localhost:8888/'+files.file[0].path; 
    connection.getConnection((err)=>{
      let Sql = `UPDATE user SET imgurl='${url}' WHERE username='${fields.username[0]}'`; //增
      connection.query(Sql,function (err, res1) {
        if(err){
          console.log('[INSERT ERROR] - ', err.message); 
          return; 
        }else{
          console.log(res1,'res1')
          res.send(myResult); 
        }
      })
    })
  })
})

module.exports = router;
