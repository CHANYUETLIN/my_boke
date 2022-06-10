// 废弃


// // 模型
// // 引入数据库 require
// // const mongoose = require("mongoose")
// let mysql = require('mysql')

// // 创建一个数据库连接池
// let connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'19991214',
//     database:'Boke_connection'
// });
// // 连接数据库
// connection.connect(function(err){
//     if(err){
//         console.log('数据库连接失败')
//     }
//     console.log('数据库连接成功')
// });

// export default connection
// // 定义一个约束文件
// // let userSchema = new mongoose.Schema(
// //     {
// //         username:String,
// //         password:String,
// //     }
// // )

// // 三个参数，（模型的名字【随便取的】，约束，表名字）
// // const userModel =  mongoose.model('User',userSchema,'表名字');

// // 导出 (导出后在持久层也就是Dao层中去连接该数据库)
// // module.exports = userModel;