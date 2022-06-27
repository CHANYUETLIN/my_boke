const express = require("express");
var router = express.Router();
var connection = require('../Dao/dbUtil');
var multiparty = require('multiparty');//获取上传的图片功能


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

// 文章发表（无图片格式）
router.post('/publish',(req,res)=>{
  let data = req.body
  console.log(data,'文章')
  connection.getConnection(function(err) {
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
      connection.query(`INSERT INTO card(username,headimg,updateTime,coverimg,introduction,views,likes,types,title,contain,bShow) VALUES ('${data.username}','${data.headimg}','${dateTime}','${data.coverimg}','${data.introduction}','0','0',${data.tag},'${data.title}','${data.contain}','${data.bShow}');`,(err,res1)=>{
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
  });
})

// 获取文章tag标签
router.get('/getTagData',(req,res)=>{
  connection.getConnection(function(err) {
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
  })
})


module.exports = router;