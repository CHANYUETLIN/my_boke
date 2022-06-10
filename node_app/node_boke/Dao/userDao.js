// 持久层用来直接与数据库进行交互
// 模拟数据库数据
// const user = [
//     {id:1,username:'sss',password:'123'}
// ]

// 有模型后就直接导入模型进行数据库连接
// const userModel = require('./model/userModel')
let db = require('./model/dbQuery')

// 设计一个函数，用来获取数据
async function findUser(sql,res){
    // const bool = users.some(item=>{item.username == data.username && item.password == data.password})
    // return bool
    // mongoose提供的数据库API方法都是异步的(find是mongoose的查询方法)
    // const users = userModel.find(data)
    await db.query(sql,data=>{
        return res(data)
        // return [data]
    })
}

module.exports = {findUser}