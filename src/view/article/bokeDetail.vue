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
      <div class="leave_message">
        <div class="write_message">
          <p>留下评论</p>
          <!-- 写留言的地方 -->
          <div style="display: flex;-items: center;border-bottom: 1px solid rgb(226, 226, 226);padding-bottom:20px">
            <div class="headimg">
              <img :src="myHeadimg" alt="">
            </div>
            <textarea name="" id="" cols="10" rows="2" v-model="onecommentsContain" placeholder="留下评论..."></textarea>
            <div> 
              <cButton :title="'发表评论'" @click="onecomments"></cButton>
            </div>
          </div>
          <!-- 看留言的地方 -->
          <div class="look_message">
            <div class="biglook" v-for="(item,index) in commentsData" :key="index" >
              <!-- 一级评论 -->
              <div class="onecomments" v-for="(idatas,i) in item" v-if="idatas.hierarchy == 1">
                <div class="biglook_head">
                  <img :src="idatas.headimg" alt="">
                  <p style="margin-right:10px;font-weight:600">{{idatas.nickname}}</p>
                  <p>{{$dataBind.timeago(new Date(idatas.replyTime))}}</p>
                  <div class="huifu" @click="huifu(idatas)">回复</div>
                  <i class="el-icon-view"></i>
                </div>
                <div class="containone" v-html="idatas.contain"></div>
                <div :class="idatas.showhuifucontain?'huifucontain':'nonehuifucontain'">
                  <textarea name="" id="" cols="10" rows="1" v-model="idatas.contains" placeholder="回复内容..."></textarea>
                  <cButton  :title="'回复评论'" @click="sureReply1(idatas,index)"></cButton>
                </div>
              </div>
              <!-- 二级评论 -->
              <div class="twocomments" v-for="(idatas,i) in item"  v-if="idatas.hierarchy > 1">
                <div class="twocomments_head">
                  <img :src="idatas.headimg" alt="">
                  <p style="margin-right:10px;font-weight:600">{{idatas.nickname}} <span style="font-size:12px"> 回复 </span> {{idatas.reply_nickname}}</p>
                  <p>{{$dataBind.timeago(new Date(idatas.replyTime))}}</p>
                  <div class="huifu" @click="huifu(idatas)">回复</div>
                  <i class="el-icon-view"></i>
                </div>
                <div class="twocontain" v-html="idatas.contain"></div>
                <div :class="idatas.showhuifucontain?'huifucontain':'nonehuifucontain'">
                  <textarea name="" id="" cols="10" rows="1" v-model="idatas.contains" placeholder="回复内容..."></textarea>
                  <cButton  :title="'回复评论'" @click="sureReply1(idatas,index)"></cButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name:'bokeDetail',
  data() {
    return {
      myLogin:{},
      detailData:{},
      dz:false,
      myHeadimg:'',
      showhuifucontain:false,
      commentsData:[],
      onecommentsContain:'',
      card_id:0,
    }
  },
  mounted(){

  },
  created(){
    this.myLogin = JSON.parse(sessionStorage.getItem('login'))
    this.myHeadimg = this.myLogin.imgurl
    this.detailData = this.$route.params
    this.articleviews()
    this.getcommentsData()
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
      console.log('浏览')
      this.$axios.post('articla/artViews',params).then(res=>{
      })
    },
    // 点击回复评论
    huifu(item){
      item.showhuifucontain = !item.showhuifucontain
    },
    // 一级评论（首评）
    onecomments(){
      let date = new Date()
      let params = {
        hierarchy:1,
        replyTime:this.$dataBind.formatDate(new Date()),
        nickname:this.myLogin.nickname,
        contain:this.onecommentsContain,
        headimg:this.myLogin.imgurl,
        likes:0,
        nonelikes:0,
        category_id:this.commentsData.length,
        card_id:this.detailData.id,
      }
      this.$axios.post(`articla/onecomments`,params).then(res=>{
        if(res.data.code == '200'){
          this.$message.success("评论成功")
          this.onecommentsContain = ''
          this.getcommentsData()
        }
        else{
          this.$message.warning("评论失败")
        }
      })
    },
    // 二级评论 （回复评）
    sureReply1(item,i){
      let date = new Date()
      let params = {
        card_id:item.card_id,
        hierarchy:2,
        replyTime:this.$dataBind.formatDate(new Date()),
        reply_id:item.id,
        reply_nickname:item.nickname,
        nickname:this.myLogin.nickname,
        contain:item.contains,
        headimg:this.myLogin.imgurl,
        likes:0,
        nonelikes:0,
        category_id:i,
        card_id:this.detailData.id,
      }
      console.log(params,i,'params')
      this.$axios.post('articla/twocomments',params).then(res=>{
        if(res.data.code == '200'){
          this.$message.success("评论成功")
          this.getcommentsData()
        }
        else{
          this.$message.warning("评论失败")
        }
      })
    },
    // 获取评论
    getcommentsData(){
      this.$axios.get(`articla/getcomments?card_id=${this.detailData.id}`).then(res=>{
        if(res.data.code == '200'){
          let commentsData = res.data.msg
          let arr = []
          for(let i in commentsData){
            this.$set(commentsData[i],'showhuifucontain',false)
            // 1层级为一个大的块
            if(commentsData[i].hierarchy == 1){ 
              arr.push([])
            }
            for(let j=0;j<arr.length;j++){
              if(commentsData[i].category_id == j){
                // console.log()
                arr[j].push(commentsData[i])
              }
            }
          }
          this.commentsData = arr
          console.log(arr,'arr',arr.length)
        }
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
  .leave_message{
    width: 100%;
    .write_message{
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 0 10px 1px rgb(218, 218, 218);
      padding: 20px;
      margin-bottom: 30px;
      position: relative;
      p{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .headimg{
        position: absolute;
        top: 60px;
        left: 20px;
        margin-right: 15px;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      textarea{
        width: 85%;
        border: 0;
        font-size: 14px;
        background: rgba(237, 237, 237, 0.721);
        border-radius: 10px;
        margin: 0 30px 0 60px;
        padding: 10px;
        min-height: 40px;
      }
      textarea:focus {
        outline: none;
      }
      textarea::-webkit-input-placeholder{
        color: rgb(186, 186, 186);
        font-size: 14px;
      }
      .look_message{
        width: 100%;
        margin-top: 10px;
        p{
          font-size: 15px;
          font-weight: 500;
          margin: 0;
        }
        .biglook{
          display:flex;
          flex-direction: column;
          align-items: flex-end;
          margin-bottom:10px;
          border-bottom:1px solid rgb(233,233,233);
          padding: 10px 0;
          position:relative;
          .onecomments{
            width: 100%;
            .biglook_head{
              display:flex;
              align-items:center;
              position:relative;
              img{
                width:30px;
                height:30px;
                border-radius:50%;
                margin-right:10px;
              }
              i{
                display:block;
                position:absolute;
                right:40px;
                font-size:18px;
                cursor:pointer
              }
              .huifu{
                position:absolute;
                right:80px;
                font-size:15px;
                cursor:pointer;
                opacity: 0;
                transition: 0.1s;
              }
            }
            .containone{
              margin-top:2px;
              margin-left:40px;
              font-size:16px
            }
            .huifucontain{
              height: 160px;
              margin:10px 0 10px 40px;
              font-size:16px;
              box-shadow: 0 0 10px 1px rgb(225, 225, 225);
              width: 90%;
              border-radius: 10px;
              overflow: hidden;
              padding: 0 10px;
              position: relative;
              transition: 0.23s;
              textarea{
                width: 100%;
                margin: 0;
                min-height: 110px;
                background: #fff;
              }
              .button{
                position: absolute;
                bottom: 5px;
                right: 2px;
              }
            }
            .nonehuifucontain{
              height: 0;
              margin:10px 0 10px 40px;
              width: 90%;
              border-radius: 10px;
              overflow: hidden;
              padding: 0 10px;
              position: relative;
              textarea{
                width: 100%;
                margin: 0;
                min-height: 110px;
                background: #fff;
              }
              .button{
                position: absolute;
                bottom: 10px;
                right: 2px;
              }
            }
          }
          .onecomments:hover .huifu{
            opacity: 1;
          }
          .twocomments{
            width:97%;
            margin-top:8px;
            .twocomments_head{
              display:flex;
              align-items:center;
              img{
                width:30px;
                height:30px;
                border-radius:50%;
                margin-right:10px;
              }
              i{
                display:block;
                position:absolute;
                right:40px;
                font-size:18px;
                cursor:pointer
              }
              .huifu{
                position:absolute;
                right:80px;
                font-size:15px;
                cursor:pointer;
                opacity: 0;
                transition: 0.1s;
              }
            }
            .twocontain{
              margin-top:2px;
              margin-left:40px;
              font-size:16px
            }
            .huifucontain{
              height: 160px;
              margin:10px 0 10px 40px;
              font-size:16px;
              box-shadow: 0 0 10px 1px rgb(225, 225, 225);
              width: 90%;
              border-radius: 10px;
              overflow: hidden;
              padding: 0 10px;
              position: relative;
              transition: 0.23s;
              textarea{
                width: 100%;
                margin: 0;
                min-height: 110px;
                background: #fff;
              }
              .button{
                position: absolute;
                bottom: 5px;
                right: 2px;
              }
            }
            .nonehuifucontain{
              height: 0;
              margin:10px 0 10px 40px;
              width: 90%;
              border-radius: 10px;
              overflow: hidden;
              padding: 0 10px;
              position: relative;
              textarea{
                width: 100%;
                margin: 0;
                min-height: 110px;
                background: #fff;
              }
              .button{
                position: absolute;
                bottom: 10px;
                right: 2px;

              }
            }
          }
          .twocomments:hover .huifu{
            opacity: 1;
          }
        }
        
      }
    }
    
  }
}

</style>
