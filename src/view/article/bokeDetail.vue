<template>
  <div style="padding:20px">
    <div class="head">{{detailData.title}}</div>
    <div class="dd">
      <p>发布人 : {{detailData.username}}</p>
      <p>发布时间 : {{detailData.updateTime}}</p>
      <p>点赞量 : {{detailData.likes}}</p>
      <p>浏览量 : {{detailData.views}}</p>
    </div>
    <div class="contain">
      <div v-html="detailData.contain"></div>
      <div class="dianzan">
        <img @click="dianzan" :class="dz?'animate':'img'" ref="dianzan" src="../../assets/image/details/tubiaozhizuomoban.png" alt="">
        <img v-if="dz" @click="dianzan" :class="dz?'animate2':'img2'" src="../../assets/image/details/dianzan.png" alt="">
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name:'bokeDetail',
  data() {
    return {
      detailData:{},
      dz:false,
    }
  },
  mounted(){

  },
  created(){
    this.detailData = this.$route.params
    this.articleviews()
  },
  computed:{

  },
  methods:{
    dianzan(){
      this.dz = !this.dz
      let likes = ''
      if(this.dz){
        this.detailData.likes = Number(this.detailData.likes) + 1
      }else{
        this.detailData.likes = Number(this.detailData.likes) - 1
      }
      likes = this.detailData.likes
      let params = {
        id:this.detailData.id,
        likes:likes
      }
      this.$axios.post('articla/artLikes',params).then(res=>{
        if(res.data.code = '200'){
          if(this.dz){
            this.$message.success("点赞成功")
          }else{
            this.$message.success("取消点赞")
          }
        }
      })
    },
    // 点进来一次浏览一次
    articleviews(){
      this.detailData.views = Number(this.detailData.views) + 1
      let params = {
        views:this.detailData.views,
        id:this.detailData.id,
      }
      this.$axios.post('articla/artViews',params).then(res=>{
      })
    },
  },
}

</script>
<style scoped lang='scss'>
.head{
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
}
.dd{
  display: flex;
  width: 100%;
  height: 40px;
  background: rgb(248, 248, 248);
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  p{
    margin-right: 20px;
    font-size: 15px;
    font-weight: 600;
  }
}
.contain{
  padding: 20px;
  box-shadow: 0 0 10px 1px rgb(239, 239, 239);
  min-height: 80vh;
  .dianzan{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 150px;
    .img{
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
    .animate {
      width: 0px;
      height: 0px;
      cursor: pointer;
      animation: scaleDraw 1s ease-in-out;
    }
    /* 点赞动画效果 */
    @keyframes scaleDraw{
      0% {
        width: 40px;
        height: 40px;  /*开始为原始大小*/
      }
      25% {
        width: 50px;
        height: 50px; /*放大1.1倍*/
      }
      50% {
        width: 40px;
        height: 40px;
      }
      75% {
        width: 50px;
        height: 50px;
      }
    }
    .img2{
      width: 0px;
      height: 0px;
      cursor: pointer;
    }
    .animate2 {
      width: 40px;
      height: 40px;
      cursor: pointer;
      animation: scaleDraw2 1s ease-in-out;
    }
    /* 点赞动画效果 */
    @keyframes scaleDraw2{
      0% {
        width: 0px;
        height: 0px;  /*开始为原始大小*/
      }
      75% {
        width: 0px;
        height: 0px;
      }
      100%{
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
