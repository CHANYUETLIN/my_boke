const connection = require('../dbUtil')
// 封装查询

let db = {}
// console.log(connection.getConnection,"connection")

db.query = function(sql,callback){
    connection.getConnection((err,conn)=>{
        if(err){
            console.log(err)
            return '' 
        }
        conn.query(sql,(err,data)=>{
            if(err){
                console.log(err)
                return ''
            }
            callback(data)
        })
    })
}


// //建立连接
// pool.getConnection(function(err, connection) {
//     // 如果连接失败了，err就是错误信息对象。
//     if(err){
//         console.log("与mysql数据库建立连接失败:" + err);
//     }else {
//         console.log("与mysql数据库建立连接成功");
//         connection.query("select * from book", (err, data) => {
//             if (err) {
//                 console.log("查询失败:" + err);
//                 return
//             }
//             //对查询的结果进行操作。
//             console.log(data);
//             //释放连接 归还连接
//             connection.release();
    
//             //用连接池对象的end方法关闭连接池
//             //pool.end();
//         })
//     }
// })


module.exports = db