<template>
<!-- 首页 -->
  <div>
    <div class="header">
      <div class="header_title">
        <div class="logo">
          <img src="../../assets/image/logo.png" alt="">
        </div>
        <div class="login" v-if="!showlogin">
          <!-- <el-button round type="primary" @click="login" size="mini">点此登录</el-button> -->
          <cButton :title="'登陆'" @click="login"></cButton>
          <cButton :title="'注册'" @click="register"></cButton>
        </div>
        <div v-if="showlogin" class="showlogin">
          <p >hello : <span @mousemove="mousemove">{{loginInfo.username}}</span></p>
          <i class="el-icon-caret-bottom"></i>
          <div class="headphoto"><img src="../../assets/image/touxiang.png" alt=""></div>
          <div class="hoverlogin" ref="hoverlogin"  @mouseleave="mouseleave">
            <ul>
              <li @click="userInfo"><i class="el-icon-user"></i> 用户信息</li>
              <li @click="development" v-if="loginInfo.dechema !=0 "><i class="el-icon-s-operation"></i> 开发管理</li>
              <li @click="markDown" v-if="loginInfo.dechema !=0 "><i class="el-icon-edit-outline"></i> 编写文章</li>
              <li @click="exitLogin"><i class="el-icon-s-tools"></i> 退出登陆</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="head_portrait" v-if="showlogin">
        <img :src="imageUrl" alt="">
      </div>
      <div class="contain">
        <div class="right">
          <el-carousel :interval="2000" type="card" height="250px" v-if="carouselList.length">
            <el-carousel-item v-for="(item,index) in carouselList" :key="index">
              <img style="width:100%;height:100%" :src="item.imgurl" alt="">
            </el-carousel-item>
          </el-carousel>
          <el-carousel :interval="2000" type="card" height="250px" v-else>
            <el-carousel-item v-for="item in 6" :key="item">
              {{item}}
            </el-carousel-item>
          </el-carousel>
          <div class="weather">
            <div id="he-plugin-standard"></div>
          </div>
        </div>
        <div class="middle">
          <card v-if="cardData.length" :cardData="cardData"></card>
        </div>
        <div class="left">
          <a href="www.baidu.com">链接</a>
          <!-- 链接有问题拉 -->
          <el-button @click="ceshi" size="mini">测试按钮</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from './components/card.vue'
export default {
  components: {card},
  props: {},
  data() {
    return {
      showlogin:false, // true为已登录状态，false是未登录状态
      loginInfo:{},
      imageUrl:'', // 头像
      carouselList:[], // 轮播图图片
      cardData:[], // 中间card展示
    };
  },
  watch: {
    
  },
  computed: {
  },
  methods: {
    ceshi(){
      let date = this.$dataBind.timeago(new Date('2022-07-04T16:00:00.000Z'))
      console.log(date,'date')
    },
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
    // 退出登陆
    exitLogin(){
      sessionStorage.clear();
      this.$router.go(0)
      this.showLogin()
    },
    // 判断是否是登陆状态 从而更改首页样式
    showLogin(){
      this.loginInfo = JSON.parse(sessionStorage.getItem('login'))
      if(this.loginInfo && this.loginInfo.username){
        this.showlogin = true
        this.getUserData()
      }else{
        this.showlogin = false
      }
    },
    // 获取当前登陆用户头像
    getUserData(){
      this.imageUrl = this.loginInfo.imgurl
    },
    // 开发者管理页
    development(){
      this.$router.push("/development")
    },
    // 获取轮播图
    getCarouselList(){
      this.$axios.get('development/getImageTableData?bShow=true').then(res=>{
        this.carouselList = res.data.msg.slice(0,6)
      })
    },
    // 获取天气预报
    getWeather(){
      window.WIDGET = {
        "CONFIG": {
          "layout": "2",
          "width": 340,
          "height": 340,
          "borderRadius": "5",
          "background": "1",
          "dataColor": "FFFFFF",
          "key": "b0510889550f4536a562532ee184c013"
        }
      };
      (function (d) {
        var c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://widget.qweather.net/standard/static/css/he-standard.css?v=1.4.0'
        var s = d.createElement('script')
        s.src = 'https://widget.qweather.net/standard/static/js/he-standard.js?v=1.4.0'
        var sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(c, sn)
        sn.parentNode.insertBefore(s, sn)
        s.onload=()=>{
          //自动宽度
          setTimeout(() => {
            document.getElementById("he-plugin-standard").style.width  = "100%";
          }, 100);
        }
      })(document)
    },
    // 获取文章内容
    getCardDataList(){
      this.$axios.get('articla/getCardData').then(res=>{
        this.cardData = res.data.msg
      })
    },
    // 编写文章
    markDown(){
      this.$router.push('/articla')
    },
  },
  created() {
    this.showLogin()
    this.getCarouselList()
    this.getWeather()
    this.getCardDataList()
  },
  mounted() {
    
  }
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
    .logo{
      img{
        width: 150px;
      }
    }
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
          color: #cc8eff;
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
            margin-bottom: 15px;
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
    min-height: 1300px;
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
      .weather{
        margin-top: 20px;
      }
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