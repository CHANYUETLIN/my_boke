<template>
  <div>
    <div v-for="(item,index) in datalist" :key="index" class="card" @click="cardDetail(item)">
      <div class="card_header">
        <div class="card_header1">
          <img src="../../../assets/image/touxiang.png" alt="">
          <p>{{item.username}}</p>
        </div>
        <div class="card_header2">
          <p>{{item.updateTime}}</p>
        </div>
      </div>
      <div class="card_cover" v-if="item.coverimg != 'undefined'">
        <img :src="item.coverimg" alt="">
      </div>
      <div class="card_introduction">
        <p>简介：{{item.introduction}}</p>
      </div>
      <div class="card_button">
        <i class="iconfont icon-dianzan" ></i> {{item.likes}}
        <i class="iconfont icon-liulanliang"></i> {{item.views}}
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :page-size="4"
        :total="cardData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    cardData:{
      type:Array,
      require:false,
      default(){
        return []
      },
    }
  },
  data() {
    return {
      datalist:[],
    }
  },
  mounted(){
    this.showCard(1)
    console.log(this.cardData,'showCardmonted')
  },
  created(){
    
  },
  computed:{

  },
  methods:{
    showCard(val){
      this.datalist = this.cardData.slice(val*4-4,val*4)
    },
    currentChange(val){
      this.showCard(val)
    },
    // 跳转至博客详情页面
    cardDetail(item){
      console.log(item,'item')
      this.$router.push({name:'bokeDetail',params:item})
    }
  },
}

</script>
<style scoped lang='scss'>
.card{
  width: 100%;
  // height: 300px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px #ededed;
  padding: 10px;
  cursor: pointer;
  .card_header{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .card_header1{
      display: flex;
      align-items: center;
      img{
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        overflow: hidden;
        margin-right: 10px;
      }
    }
    .card_header2{
      p{
        font-weight: 600;
        margin-right: 20px;
        font-size: 15px;
      }
    }
  }
  .card_cover{
    width: 100%;
    height: 250px;
    margin-bottom: 10px;
    img{
      // width: 100%;
      height: 100%;
      display: block;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .card_introduction{
    width: 100%;
    height: 60px;
    p{
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;  // 数字代表文字需要显示几行
    }
  }
  .card_button{
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    font-weight: 600;
    font-size: 16px;
    i{
      margin-right: 5px;
      margin-left: 25px;
      cursor: pointer;
    }
  }
}
.pagination{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
}
</style>
