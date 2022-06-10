// 连接数据库代码写在这里


let mysql = require('mysql')

// 创建一个数据库连接池
let pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'19991214',
    database:'boke'
});



// console.log(pool.getConnection,"getConnection")

// pool.end();
module.exports = pool