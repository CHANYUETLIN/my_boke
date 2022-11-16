const express = require("express");
var router = express.Router();
var connection = require('../Dao/dbUtil');
var multiparty = require('multiparty');//获取上传的图片功能

function toLiteral(str) {
  var dict = { '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f', '\r': 'r' };
  return str.replace(/([\\'"\b\t\n\v\f\r])/g, function($0, $1) {
      return '\\' + (dict[$1] || $1);
  });
}

// Markdown的保存文章时（带图片）先将图片保存到服务器，获得url后，返回给前端，将前端Markdown的img src替换为图片地址（原来的src是base64格式）
router.post('/mdimg',(req,res)=>{
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
    res.send(myResult)
  })
})

// 文章发表 (新的数据，未在数据库中存在)
router.post('/publish',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      // 当前时间
      let a = new Date()
      let dateTime = "yyyy-MM-dd"
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
      connection.query(`INSERT INTO card(username,headimg,updateTime,coverimg,introduction,views,likes,types,title,contain,private,mdContain,isDraft) VALUES ('${data.username}','${data.headimg}','${dateTime}','${data.coverimg}','${data.introduction}','0','0',${data.tag},'${data.title}','${data.contain}','${data.private}','${data.mdContain}','${data.isDraft}');`,(err,res1)=>{
        if(err){
          console.log("数据库新增失败",err)
        }else{
          res.send({
            code:'200',
            msg:'新增成功'
          })
        }
      })
    }
    con.release() // 释放连接
  });
})

// 发表文章，已存在的数据，更新数据内容
router.post('/updateArticle',(req,res)=>{
  let data = req.body
  console.log(data,'daat')
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      // 当前时间
      let a = new Date()
      let dateTime = "yyyy-MM-dd"
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
      connection.query(`UPDATE card SET username="${data.username}",headimg="${data.headimg}",updateTime="${dateTime}",coverimg="${data.coverimg}",introduction="${data.introduction}",views="${data.views?data.views:'0'}",likes="${data.likes?data.likes:'0'}",types="${data.tag}",title="${data.title}",contain='${data.contain}',private="${data.private}",mdContain='${data.mdContain}',isDraft="${data.isDraft}" WHERE id="${data.id}"`,(err,res1)=>{
        if(err){
          console.log("数据库更新失败",err)
        }else{
          res.send({
            code:'200',
            msg:'更新成功'
          })
        }
      })
    }
    con.release() // 释放连接
  });
})

// 上传文章封面
router.post('/InsertheadImg',(req,res)=>{
  // 要返回的 json 数据
  var myResult = {
    result: [{}]
  };
  var form = new multiparty.Form();
  form.uploadDir='public/images'; //上传图片保存的地址(目录必须存在)
  form.parse(req, function(err, fields, files) { // 1、fields:获取表单的数据 2、files：图片上传成功返回的信息
    myResult.result[0].code = "200"; 
    myResult.result[0].message="success"; 
    console.log(fields,files,'files')
    let url='http://localhost:8888/'+files.file[0].path; 
    let imgurl = url.replace(url.substring(22,36),'') // http://localhost:8888/frocnecRE047_pXgBQt499GC.png url
    myResult.result[0].imgurl=imgurl;
    res.send(myResult); 
  })
})

// 获取文章tag标签
router.get('/getTagData',(req,res)=>{
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`SELECT * FROM tagTable`,(err,res1)=>{
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

// 获取文章内容(查询card表bShow为true的)
router.get('/getCardData',(req,res)=>{
  let sql = ''
  if(req.query.tagKey == 'all'){
    sql = `SELECT * FROM card WHERE bShow='true'`
  }else{
    sql = `SELECT * FROM card WHERE bShow='true' AND types='${req.query.tagKey}'`
  }
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`${sql}`,(err,res1)=>{
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

// 文章内容点赞
router.post('/artLikes',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE card SET likes='${data.likes}' WHERE id=${data.id}`,(err,res1)=>{
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

// 文章内容浏览量
router.post('/artViews',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE card SET views='${data.views}' WHERE id=${data.id}`,(err,res1)=>{
        if(err){
          console.log("数据库更新失败1")
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

/**文章评论 */

// 获取评论数据
router.get('/getcomments',(req,res)=>{
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功1。');
      connection.query(`SELECT * FROM card_comments WHERE card_id=${req.query.card_id}`,(err,res1)=>{
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

// 发表一级评论
router.post('/onecomments',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功1。');
      connection.query(`insert into card_comments (hierarchy,replyTime,nickname,contain,headimg,likes,nonelikes,card_id,category_id) values ('${data.hierarchy}','${data.replyTime}','${data.nickname}','${data.contain}','${data.headimg}','${data.likes}','${data.nonelikes}',${data.card_id},${data.category_id});`,(err,res1)=>{
        if(err){
          console.log("数据库插入失败",err)
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

// 发表二级及以上评论
router.post('/twocomments',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err,con) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功2。');
      connection.query(`insert into card_comments (hierarchy,replyTime,reply_id,nickname,contain,headimg,likes,nonelikes,card_id,reply_nickname,category_id) values ('${data.hierarchy}','${data.replyTime}','${data.reply_id}','${data.nickname}','${data.contain}','${data.headimg}','${data.likes}','${data.nonelikes}',${data.card_id},'${data.reply_nickname}',${data.category_id});`,(err,res1)=>{
        if(err){
          console.log("数据库插入失败")
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

module.exports = router;