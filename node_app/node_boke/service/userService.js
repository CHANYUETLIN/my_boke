// service是业务层，从dao层获取数据，service将数据进行处理后，暴露给表示层，再由表示层（ui层）进行页面展示

const res = require('express/lib/response')
const { text } = require('_body-parser@1.18.3@body-parser')
let {findUser} = require('../Dao/userDao')

// async function login(data){
//     let res = await findUser('select * from user')
//     return res;
// }
function login(res,data){
    return new Promise((res,rej)=>{
       findUser('select * from user',res)
    }).then(result=>{

        if(!data.username || !data.password){
            return res({
                code:'404',
                msg:'请输入用户名和密码'
            })
        }
        for(let i=0;i<result.length;i++){
            if(data.username == result[i].username && data.password == result[i].password){
                return res({
                    code:'200',
                    msg:'登陆成功'
                })
            }
            if(i == result.length-1 && (data.username != result[i].username && data.password != result[i].password)){
                return res({
                    code:'203',
                    msg:'登陆失败，用户名或密码错误'
                })
            }
        }
    }).catch(()=>{
        return res({
            code:'500',
            msg:'数据库查询错误'
        })
    })
}

module.exports = {
    login
}



