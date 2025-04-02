const express = require("express");
var router = express.Router();
var connection = require('../Dao/dbUtil');
var multiparty = require('multiparty');//获取上传的图片功能
const uuid = require('uuid');

/*游戏*/

/**
 * 登陆
 */
router.get("/login",(req,res)=>{
  let data = req.query
  if(!data.username || !data.password){
    res.send({
      code:'201',
      msg:"用户名或密码不能为空"
    })
  }else{
    connection.getConnection(function(err,con) {
      if(err) console.log('与MySQL数据库建立连接失败。');
      else{
        connection.query(`SELECT username from gameuser where username='${data.username}' and password=${data.password}`,(err,res1)=>{
          if(err){
            console.log("数据库查询失败")
          }else{
            console.log(res1,'res1')
            if(res1.length){
              res.send({
                code:'200',
                msg:"登陆成功"
              })
            }else{
              res.send({
                code:'203',
                msg:"账户或密码错误"
              })
            }
          }
        })
      }
      con.release() // 释放连接
    });
  }
})

/**
 * 注册
 */
router.post("/register",(req,res)=>{
  let data = req.body
  if(!data.username || !data.password){
    res.send({
      code:'201',
      msg:"用户名或密码不能为空"
    })
  }else{
    connection.getConnection(function(err,con) {
      if(err) console.log('与MySQL数据库建立连接失败。');
      else{
        let ids = uuid.v1();
        data.id = ids
        data.dechema = 0
        // 查询是否有重复的用户名
        connection.query(`SELECT username from gameuser where username='${data.username}'`,(err,res1)=>{
          if(err){
            console.log("数据库查询失败")
          }else{
            if(res1.length){
              res.send({
                code:'201',
                msg:"已有重复用户名，请更换用户名进行注册"
              })
            }else{
              connection.query(`INSERT INTO gameuser(guid,username,password,dechema) VALUES('${data.id}','${data.username}','${data.password}','${data.dechema}')`,function(err,data){
                if(err){
                  console.log('插入数据失败',err)
                } else {
                  console.log('插入数据成功');
                  res.send({
                    code:'200',
                    msg:'注册成功'
                  })
                }
              })
            }
          }
        })
      }
      con.release() // 释放连接
    });
  }
})

module.exports = router;
