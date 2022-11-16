<template>
  <div>
    <div v-for="(item,index) in datalist" :key="index" class="card" @click="cardDetail(item)">
       <!-- v-if="item.isDraft == 0" -->
      <div class="card_header">
        <div class="card_header1">
          <img src="../../../assets/image/touxiang.png" alt="">
          <p>{{item.username}}</p>
        </div>
        <div class="card_header2">
          <p>{{$dataBind.timeago(new Date(item.updateTime))}}</p>
        </div>
      </div>
      <div class="card_cover" v-if="item.coverimg != 'undefined' && item.coverimg != '' && item.coverimg != 'null'">
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
      console.log(sessionStorage.getItem('login'),item,'item')
      if(!sessionStorage.getItem('login')){
        this.$message.error('请登录后访问')
        return ''
      }
      this.$router.push({name:'bokeDetail',params:{contain:item}})
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
        font-size: 13px;
      }
    }
  }
  .card_cover{
    width: 100%;
    height: 150px;
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
    padding-top: 5px;
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
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px #e4e4e4;
  padding: 6px 0px;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #25282b;
  color: #ffc8fc;
  border-radius: 4px;
  cursor: pointer;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #ffc8fc;
}
</style>
