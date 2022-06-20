<template>
  <div>
    <div class="header">
      <div class="header_title">
        <div class="logo">logo</div>
        <div class="login" v-show="!showlogin">
          <!-- <el-button round type="primary" @click="login" size="mini">点此登录</el-button> -->
          <cButton :title="'登陆'" @click="login"></cButton>
          <cButton :title="'注册'" @click="register"></cButton>
        </div>
        <div v-show="showlogin" class="showlogin">
          <p >hello : <span @mousemove="mousemove">{{loginInfo.UserName}}</span></p>
          <i class="el-icon-caret-bottom"></i>
          <div class="headphoto"><img src="../../assets/image/touxiang.png" alt=""></div>
          <div class="hoverlogin" ref="hoverlogin"  @mouseleave="mouseleave">
            <ul>
              <li @click="userInfo"><i class="el-icon-user"></i> 用户信息</li>
              <li><i class="el-icon-s-operation"></i> 开发管理</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="head_portrait">
        <img v-show="showlogin" src="../../assets/image/touxiang.png" alt="">
      </div>
      <div class="contain">
        <div class="right">
          <el-carousel :interval="2000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="middle"></div>
        <div class="left"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      showlogin:false, // true为已登录状态，false是未登录状态
      loginInfo:{},
    };
  },
  watch: {},
  computed: {},
  methods: {
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/register')
    },
    // 鼠标移入
    mousemove(){
      this.$refs.hoverlogin.style = "height:200px;transition:0.24s"
    },
    // 鼠标移出
    mouseleave(){
      this.$refs.hoverlogin.style = "height:0px;"
    },
    // 账户信息
    userInfo(){
      this.$router.push("/userInfo")
    },
  },
  created() {
    // 判断是否是登陆状态
    this.loginInfo = JSON.parse(sessionStorage.getItem('login'))
    if(this.loginInfo.UserName){
      this.showlogin = true
    }else{
      this.showlogin = false
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.header{
  width: 100%;
  height: 400px;
  background: rgb(219, 219, 255);
  background-image: url('../../assets/home/banner03.png');
  background-repeat:no-repeat;
  background-size: 100%;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
  box-shadow: 0px 5px 20px #9dbaf2;
  .header_title{
    height: 50px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 40px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    // opacity: 0;

    .login{
      width: 250px;
      display: flex;
      justify-content: space-around
    }
    .showlogin{
      width: 250px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      p{
        font-size: 14px;
        color: rgb(71, 71, 71);
        span{
          font-size: 16px;
          cursor: pointer;
          color: rgb(144, 49, 222);
        }
      }
      .hoverlogin{
        width: 120px;
        height: 0px;
        overflow: hidden;
        position: absolute;
        top: 36px;
        right: 30px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul{
          width: 100%;
          li{
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            width: 100%;
            i{
              margin-right: 5px;
            }
          }
        }
      }
      .headphoto{
        width: 30px;
        height: 30px;
        border-radius: 10px;
        overflow: hidden;
        margin-left: 10px;
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
    
  }
  .header_title:hover{
    height: 50px;
    opacity: 0.9;
    transition: 0.25s;
  }
}
.content{
  width: 100%;
  position: relative;
  padding-top: 50px;
  .head_portrait{
    width: 100px;
    height: 100px;
    background: rgb(255, 213, 205);
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    left: 200px;
    top: -50px;
    img{
      width: 100px;
      height: 100px;
    }
  }
  .contain{
    height: 600px;
    // background: rgb(213, 255, 227);
    padding: 40px 40px 30px 40px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .right{
      width: 25%;
      // background: rgb(227, 255, 227);
      margin: 0 10px;
      border: 1px dotted #9dbaf278;
      padding: 20px;
    }
    .middle{
      width: 60%;
      // background: rgb(255, 254, 222);
      
      border: 1px dotted #9dbaf278;
      padding: 20px;
      margin: 0 20px;
    }
    .left{
      width: 15%;
      // background: #d8faff;
      border: 1px dotted #9dbaf278;
      padding: 20px;
      margin: 0 20px;
    }
  }
}


.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>