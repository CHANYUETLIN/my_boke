const express = require("express");
var router = express.Router();
var connection = require('../Dao/dbUtil')
// 下载uuid npm install uuid --save 用来生成唯一名字
const uuid = require('uuid');
// code:200成功，201查询成功但非自己想要的数据，

// 用户注册（注册了才能评论 在数据库中先查询是否有相同名字的用户名后，再进行注册）
router.post("/register",(req,res)=>{
  // console.log(req.body)
  let data = req.body
  // if(req.body.username == ""){
  if(!data.username || !data.password){
    console.log("用户名不能为空")
    res.send({
      code:'201',
      msg:"用户名或密码不能为空"
    })
  }else{
    connection.getConnection(function(err) {
      if(err) console.log('与MySQL数据库建立连接失败。');
      else{
        let mydate = new Date();
        let ids = mydate.getTime();
        data.id = ids
        data.dechema = 0
        console.log('与MySQL数据库建立连接成功。',data);
        // 查询是否有重复的用户名
        connection.query(`SELECT username from user where username='${data.username}'`,(err,res1)=>{
          if(err){
            console.log("数据库查询失败")
          }else{
            if(res1.length){
              res.send({
                code:'201',
                msg:"已有重复用户名，请更换用户名进行注册"
              })
            }else{
              connection.query(`INSERT INTO user(id,username,password,dechema) VALUES('${data.id}','${data.username}','${data.password}','${data.dechema}')`,function(err,data){
                if(err){
                  console.log('插入数据失败',err)
                } else {
                  console.log('插入数据成功');
                  res.send({
                    code:'200',
                    msg:'注册成功'
                  })
                }
                // connection.end()
                // connection.end(function(err) {
                //   if (err) {
                //       console.log('关闭数据库连接失败！')
                //       throw err
                //   }else{
                //     console.log("关闭成功")
                //   }
                // })
              })
            }
          }
        })
      }
    });
  }
  // console.log(req.body)
  
})

module.exports = router;
