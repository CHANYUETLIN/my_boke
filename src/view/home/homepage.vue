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
          <!-- <i class="el-icon-caret-bottom"></i> -->
          <div class="headphoto" @mousemove="mousemove" @mouseleave="mouseleave">
            <img src="../../assets/image/touxiang.png" alt="" ref="headImg">
            <div class="hoverlogin" ref="hoverlogin" >
              <ul style="margin-top:25px">
                <li @click="userInfo"><i class="el-icon-user"></i> 用户信息</li>
                <li @click="development" v-if="loginInfo.dechema !=0 "><i class="el-icon-s-operation"></i> 开发管理</li>
                <li @click="markDown" v-if="loginInfo.dechema !=0 "><i class="el-icon-edit-outline"></i> 编写文章</li>
                <li @click="exitLogin"><i class="el-icon-s-tools"></i> 退出登陆</li>
              </ul>
            </div>
          </div>
          
          <p >hello : <span>{{loginInfo.username}}</span></p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="head_portrait" v-if="showlogin">
        <img :src="imageUrl" alt="">
      </div>
      <div class="contain">
        <div class="right">
          <div class="weather">
            <div id="he-plugin-standard"></div>
          </div>
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
      let arr = [{}]
      arr[0].bEdit = '123'
      console.log(arr)
    },
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/register')
    },
    // 鼠标移入
    mousemove(){
      this.$refs.hoverlogin.style = "height:200px;transition:0.24s;box-shadow: 0 0 6px 1px #fff;"
      this.$refs.headImg.style = "width:60px;height:60px;transition:0.24s;border-radius:50%;position:absolute;z-index:9;"
    },
    // 鼠标移出
    mouseleave(){
      this.$refs.hoverlogin.style = "height:0px;"
      this.$refs.headImg.style = "width:40px;height:40px;transition:0.24s;border-radius:50%"
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
        // 按照时间倒叙排列
        this.cardData = this.$dataBind.sortBy(res.data.msg,'updateTime','desc') 
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
  background-image: url('../../assets/home/banner04.png');
  background-repeat:no-repeat;
  background-size: 100%;
  border-bottom-left-radius:10px;
  border-bottom-right-radius:10px;
  box-shadow: 0px 0px 10px 3px #f9d1d8;
  .header_title{
    height: 60px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 40px;
    // border-bottom-left-radius:10px;
    // border-bottom-right-radius:10px;
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
        width: 225px;
        height: 0px;
        overflow: hidden;
        position: absolute;
        top: 48px;
        right: -96px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul{
          width: 100%;
          li{
            padding: 7px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;
            transition: 0.24s;
            width: 100%;
            i{
              margin-right: 5px;
            }
          }
          li:hover{
            background: rgb(255, 246, 246);
          }
        }
      }
      .headphoto{
        width: 40px;
        height: 40px;
        // overflow: hidden;
        position: relative;
        margin: 0 30px;
        cursor: pointer;
        img{
          width: 40px;
          height: 40px;
          border-radius: 25px;
        }
      }
    }
    
  }
  .header_title:hover{
    height: 60px;
    background: rgb(255, 255, 255);
    // background: rgba(255,255,255,0.3);
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
        margin-bottom: 40px;
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