const express = require("express");
var router = express.Router();
var connection = require('../Dao/dbUtil');
var multiparty = require('multiparty');//获取上传的图片功能


/* 后台管理 */ 


/**轮播图管理 */

// 首页左侧轮播图上传
router.post('/bannerUpload',(req,res)=>{
  // 要返回的 json 数据
  var myResult = {
    result: [{}]
  };
  var form = new multiparty.Form();
  form.uploadDir='public/images'; //上传图片保存的地址(目录必须存在)
  form.parse(req, function(err, fields, files) { // 1、fields:获取表单的数据 2、files：图片上传成功返回的信息
    myResult.result[0].code = "200"; 
    myResult.result[0].message = "success";
    let url='http://localhost:8888/'+files.file[0].path; 
    let imgurl = url.replace(url.substring(22,36),'') // http://localhost:8888/frocnecRE047_pXgBQt499GC.png url
    myResult.result[0].imgurl = imgurl;
    myResult.result[0].name = files.file[0].originalFilename;
    // 当前时间
    let a = new Date()
    let dateTime = "yyyy-MM-dd HH:mm:ss"
    let date = new Date(a)
    if (/(y+)/.test(dateTime)) {
      dateTime = dateTime.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(dateTime)) {
        let str = o[k] + '';
        dateTime = dateTime.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
    }
    connection.getConnection((err,con)=>{
      let Sql = `INSERT INTO bannerimg (imgurl,name,dateTime,bShow) VALUES ('${imgurl}','${files.file[0].originalFilename}','${dateTime}','true');`; //增
      connection.query(Sql,function (err, res1) {
        if(err){
          console.log('[INSERT ERROR] - ', err.message); 
          return; 
        }else{
          res.send(myResult); 
        }
      })
      con.release() // 释放连接
    })
  })
})

// 获取图片数据（获取轮播图管理数据）
router.get('/getImageTableData',(req,res)=>{
  let data = req.query
  var url = ''
  if(data.bShow){
    url = `SELECT * FROM bannerimg WHERE bShow = '${data.bShow}'`
  }else{
    url = `SELECT * FROM bannerimg`
  }
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      // 查询是否有重复的用户名
      connection.query(`${url}`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败",err)
        }else{
          res.send({
            code:'200',
            msg:res1
          })
        }
      })
    }
    con.release() // 释放连接
  });
})

// 处理图片显示数据（根据图片路径显示或隐藏该行数据）
router.post('/changeImageTableData',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE bannerimg SET bShow = "${data.bShow}" WHERE imgurl = "${data.imgurl}"`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          res.send({
            code:'200',
            msg:'更改成功'
          })
        }
      })
    }
    con.release() // 释放连接
  });
})


/** 文章管理 */

// 文章管理获取所有文章数据
router.get('/getCardData',(req,res)=>{
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`SELECT * FROM card`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          res.send({
            code:'200',
            msg:res1
          })
        }
      })
    }
    con.release() // 释放连接
  })
})

// 删除文章
router.post('/deletCardData',(req,res)=>{
  let id = req.body.id
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE card SET bShow='false' WHERE id=${id}`,(err,res1)=>{
        if(err){
          console.log("数据库更新失败")
        }else{
          res.send({
            code:'200',
            msg:res1
          })
        }
      })
    }
    con.release() // 释放连接
  })
})

// 修改文章数据
router.post('/updateCardData',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE card SET introduction='${data.introduction}',title='${data.title}',types='${data.types}',private='${data.private}' WHERE id=${data.id}`,(err,res1)=>{
        if(err){
          console.log("数据库更新失败",err)
        }else{
          res.send({
            code:'200',
            msg:res1
          })
        }
      })
    }
    con.release() // 释放连接
  })
})


/** 用户管理 */
// 用户所有数据查询
router.get('/AlluserData',(req,res)=>{
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`SELECT * FROM user`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          let arr = res1
          for(let i in arr){
            arr[i].bEdit = false
          }
          res.send({
            code:'200',
            msg:arr
          })
        }
      })
    }
    con.release() // 释放连接
  })
})

// 更改用户状态
router.post('/updateUserDechema',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE user SET dechema=${data.dechema} WHERE id=${data.id}`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          res.send({
            code:'200',
            msg:res1
          })
        }
      })
    }
    con.release() // 释放连接
  })
})


/**
 * 书签管理
 */
// 新建(保存)书签
router.post('/InsertTagTable',(req,res)=>{
  let data = req.body
  console.log(data,'data')
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`INSERT INTO tagtable (tagName,tagKey,bShow) VALUES ('${data.tagName}','${data.tagKey}','${data.bShow}');`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          res.send({
            code:'200',
            msg:'新建成功',
          })
        }
      })
    }
    con.release() // 释放连接
  });
})

// 更新书签状态
router.post('/UpDateTagTable',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE tagtable SET bShow="${data.bShow}",tagName="${data.tagName}" WHERE id = "${data.id}"`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          res.send({
            code:'200',
            msg:'更改成功'
          })
        }
      })
    }
    con.release() // 释放连接
  });
})


module.exports = router;