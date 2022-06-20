<template>
  <div class="body">
    <ctab :breadcrumb="breadcrumb"></ctab>
    <div class="user">
      <div class="list">
        <div class="headphoto">
          <img src="../../assets/image/touxiang.png" alt="">
        </div>
        <ul>
          <li :class="active == index ? 'activelist':'noneactivelist'" v-for="(item,index) in userlist" :key="index" @click="chooseList(index)">{{item}}</li>
        </ul>
      </div>
      <div class="content">
        <div v-show="active == 0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ctab from '../../components/ctab.vue'
export default {
  components: { ctab },
  data() {
    return {
      breadcrumb:[{name:'用户中心',path:'/'}],
      userlist:["个人资料","我的文章"],
      active:0,
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    chooseList(index){
      this.active = index

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
  height: 90%;
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
        margin-bottom: 10px;
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
    background: rgb(233, 255, 233);
  }
}
</style>
