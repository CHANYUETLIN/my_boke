<template>
  <div>
    <div class="header">
      <div class="header_title">
        <div class="logo">logo</div>
        <div class="login">
          <el-button round type="primary">点此登录</el-button>
          <el-button round>我要注册</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="head_portrait">头像</div>
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
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
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
    height: 10px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 40px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    opacity: 0;

    .login{
      width: 300px;
      display: flex;
      justify-content: space-around
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
    position: absolute;
    left: 200px;
    top: -50px;
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