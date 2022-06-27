<template>
  <div>
    <div v-for="(item,index) in cardData" :key="index" class="card">
      <div class="card_header">
        <div class="card_header1">
          <img src="../../../assets/image/touxiang.png" alt="">
          <p>用户名</p>
        </div>
        <div class="card_header2">
          <p>2022/6/27</p>
        </div>
      </div>
      <div class="card_cover">
        <img src="" alt="">
      </div>
      <div class="card_introduction">
        <p>简介：家发开始卡是风口浪尖阿里发疯了可恶我设计费iOSad房间辣思of速度快放假阿福卡设计费iOSad房间辣思考</p>
      </div>
      <div class="card_button">
        <i class="iconfont icon-dianzan" ></i> 100
        <i class="iconfont icon-liulanliang"></i> 2000
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="100">
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
        return [1,2,3]
      },
    }
  },
  data() {
    return {

    }
  },
  mounted(){

  },
  created(){

  },
  computed:{

  },
  methods:{
    currentChange(val){
      console.log(val,'val')
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
      width: 100%;
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
