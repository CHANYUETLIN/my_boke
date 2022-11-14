<template>
  <div class="body">
    <ctab :breadcrumb="breadcrumb"></ctab>
    <div class="user">
      <div class="list">
        <div class="headphoto">
          <!-- <img src="../../assets/image/touxiang.png" alt=""> -->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/users/InsertheadImg"
            :show-file-list="false"
            :http-request="uploadImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <ul>
          <li :class="active == index ? 'activelist':'noneactivelist'" v-for="(item,index) in userlist" :key="index" @click="chooseList(index)">{{item}}</li>
        </ul>
      </div>
      <div class="content">
        <div v-show="active == 0" style="width:100%;height:100%">
          <my-index-info></my-index-info>
        </div>
        <div v-show="active == 1" style="width:100%;height:100%">
          暂未开发
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myIndexInfo from './components/myIndexInfo.vue'
export default {
  components: { myIndexInfo },
  data() {
    return {
      breadcrumb:[{name:'用户中心',path:''}],
      userlist:["个人资料","我的文章"],
      active:0,
      imageUrl: ""
    }
  },
  mounted(){

  },
  computed:{

  },
  created(){
    this.getUserData()
  },
  methods:{
    chooseList(index){
      this.active = index
    },
    // 获取当前登陆用户头像
    getUserData(){
      let login = JSON.parse(sessionStorage.getItem('login'))
      if(!login &&  !login.username) return ''
      let params = {
        username:login.username
      }
      this.$axios.post('/users/QueryUserInfo',params).then(res=>{
        this.imageUrl = res.data.result[0].imgurl
      })
    },
    // 上传头像或更改头像
    uploadImg(f){
      let formData = new FormData();
      let username = JSON.parse(sessionStorage.getItem('login')).username
      formData.append("file", f.file);
      formData.append('username',username)
      this.$axios({
        method: "post",
        url: "http://localhost:8888/users/InsertheadImg",
        data: formData
      }).then(res => {
        //上传成功之后 显示图片
        this.imageUrl = res.data.result[0].imgurl ;
      });
    },
  },
}

</script>
<style scoped lang="scss">
.body{
  background: rgb(238, 238, 238);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0 20px;
}
.user{
  width: 100%;
  height: 92%;
  background: #fff;
  display: flex;
  .list{
    width: 15%;
    height: 100%;
    background: rgb(226, 226, 226);
    .headphoto{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    ul{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      li{
        margin-bottom: 20px;
        font-weight: 600;
        cursor: pointer;
      }
      .activelist{
        color: rgb(144, 49, 222);
      }
      .noneactivelist{
        color: #000;
      }
    }
  }
  .content{
    width: 85%;
    height: 100%;
    // background: rgb(233, 255, 233);
    background: #fff;
  }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;    
    background: #fff;
    border-radius: 50%;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
