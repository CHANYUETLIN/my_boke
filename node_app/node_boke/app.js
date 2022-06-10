var createError = require('http-errors'); //错误信息处理
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 连接数据库
// const dbUtil = require('./Dao/dbUtil')

var app = express();

app.all("*",function(request,response,next){ 
  response.header("Access-Control-Allow-Origin", "*");//访问控制允许来源：所有             
  response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');//访问控制允许报头X-Requested-With: xhr请求 
  response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//访问控制允许方法 
  response.header("X-Powered-By",'X-Requested-With');//自定义头信息，表示服务端用3.2.1 
  response.header("Content-Type", "application/json;charset=utf-8"); 
  // response.header("Access-Control-Allow-Headers", "X-Requested-With");
	// response.header('Access-Control-Allow-Headers', ['mytoken','Content-Type']);
  next(); 
})

// 加载路由文件（请求接口设计就在）
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 挂载第三方插件 
app.use(logger('dev')); 
// 客户端请求get post两种
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
// 静态资源解析
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;

// 入口文件app.js直接启动  node app.js
app.listen('8888',function(){
  console.log("服务器已启动，访问地址为：http://localhost:8888")
})

