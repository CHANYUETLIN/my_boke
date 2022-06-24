<template>
  <div>
    <div class="myIndexInfo">
      <p>个人资料</p>
    </div>
    <div class="form">
      <el-form label-position="right" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formLabelAlign.sex" placeholder="请选择性别">
            <el-option label="男" :value='0'></el-option>
            <el-option label="女" :value='1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="formLabelAlign.dechema" placeholder="当前用户角色" :disabled="formLabelAlign.dechema==0">
            <el-option v-for="(item,index) in dechema" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email"
        :rules="[
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="个人描述">
          <el-input type="textarea" v-model="formLabelAlign.described"></el-input>
        </el-form-item>
        <el-form-item label="个人网址">
          <el-input v-model="formLabelAlign.url"></el-input>
        </el-form-item>
        <el-form-item>
          <cButton @click="saveInfo(formLabelAlign)" :title="'保存资料'"></cButton>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign:{},
      dechema:[{value:0,label:'普通用户'},{value:1,label:'管理员'},{value:2,label:'开发管理员'}],
      login:{},
    }
  },
  mounted(){

  },
  created(){
    this.getData()
  },
  computed:{

  },
  methods:{
    // 获取当前登陆用户现有资料
    getData(){
      this.login = JSON.parse(sessionStorage.getItem('login'))
      if(!this.login &&  !this.login.username) return ''
      let params = {
        username:this.login.username
      }
      this.$axios.post('/users/QueryUserInfo',params).then(res=>{
        this.formLabelAlign = res.data.result[0]
      })
    },
    saveInfo(){
      let params = this.formLabelAlign
      this.$axios.post('/users/UpdateUserInfo',params).then(res=>{
        if(res.data.code != '200'){
					this.$notify.error({
						title: '错误',
						message: res.data.msg
					});
				}else{
					this.$message.success('用户信息更新成功');
				}
      })
    },
  },
}

</script>
<style scoped lang='scss'>
.myIndexInfo{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(218, 218, 218);
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  font-weight: 600;
}
.form{
  padding: 0 15px;
  margin-top: 40px;
}
/deep/ .el-form,.el-form--label-left{
  width: 60%;
}
</style>
