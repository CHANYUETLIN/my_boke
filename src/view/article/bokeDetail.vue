<template>
  <div style="padding:20px">
    <div class="head">{{detailData.title}}</div>
    <div class="dd">
      <p>发布人 : {{detailData.username}}</p>
      <p>发布时间 : {{detailData.updateTime}}</p>
      <p>点赞量 : {{detailData.likes}}</p>
      <p>浏览量 : {{detailData.views}}</p>
    </div>
    <div class="contain" v-html="detailData.contain"></div>
  </div>
</template>

<script>
export default {
  name:'bokeDetail',
  data() {
    return {
      detailData:{},
    }
  },
  mounted(){

  },
  created(){
    this.detailData = this.$route.params
    console.log(this.$route,'params')
  },
  computed:{

  },
  methods:{

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
}
</style>
