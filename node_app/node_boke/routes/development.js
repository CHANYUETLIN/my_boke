const express = require("express");
var router = express.Router();
var connection = require('../Dao/dbUtil');
var multiparty = require('multiparty');//获取上传的图片功能

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
    connection.getConnection((err)=>{
      let Sql = `INSERT INTO bannerimg (imgurl,name,dateTime,bShow) VALUES ('${imgurl}','${files.file[0].originalFilename}','${dateTime}','true');`; //增
      connection.query(Sql,function (err, res1) {
        if(err){
          console.log('[INSERT ERROR] - ', err.message); 
          return; 
        }else{
          res.send(myResult); 
        }
      })
    })
  })
})

// 获取图片数据
router.get('/getImageTableData',(req,res)=>{
  let data = req.query
  console.log(data.bShow,'data')
  var url = ''
  if(data.bShow){
    url = `SELECT * FROM bannerimg WHERE bShow = '${data.bShow}'`
  }else{
    url = `SELECT * FROM bannerimg`
  }
  connection.getConnection(function(err) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      // 查询是否有重复的用户名
      connection.query(`${url}`,(err,res1)=>{
        console.log(url,'url')
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
  });
})

// 删除图片数据
router.post('/deleteImageTableData',(req,res)=>{
  let data = req.body
  connection.getConnection(function(err) {
    if(err) console.log('与MySQL数据库建立连接失败。');
    else{
      console.log('与MySQL数据库建立连接成功。');
      connection.query(`UPDATE bannerimg SET bShow = "false" WHERE imgurl = "${data.imgurl}"`,(err,res1)=>{
        if(err){
          console.log("数据库查询失败")
        }else{
          res.send({
            code:'200',
            msg:'删除成功'
          })
        }
      })
    }
  });
})

module.exports = router;