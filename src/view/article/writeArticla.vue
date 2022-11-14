<template>
  <div id="edit">
    <!-- 这里是编写博客的界面 -->
    <!-- 首先在Vue项目所在的终端输入一下命令 安装 mavon-editor  -->
    <!-- https://www.askajohnny.com/#/blog/43 -->
    <!-- //指定工具栏
    //指定图片上传调用的方法，该方法主要将图片上传后台，并且返回地址，替换到markdown中
    //删除图片调用的方法，该方法主要调用后台删除图片
    //
    //绑定 value 值  必须的
    //监听markdown输入 ，可以实时保存等等。。	
    //指定一个用来引用markdown的 可以是任意字符串 -->
    <div class="header">
      <div class="alls">
        <div class="return">
          <router-link to="/">
            <i class="el-icon-arrow-left">返回</i>
          </router-link>
        </div>
        <div class="title">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
        </div>
        <div class="Save">
           <el-button round @click="savesDraft">保存草稿</el-button>
        </div>
        <div class="publish">
          <el-button round @click="publish">发表文章</el-button>
        </div>
        <div class="headimg">
          <img :src="headimg" alt="">
        </div>
      </div>
    </div>
    <div class="markdown">
      <mavon-editor
        :toolbars="toolbars" 
        :codeStyle="codeStyle" 
        @imgAdd="handleEditorImgAdd" 	
        @imgDel="handleEditorImgDel"	
        style="height:calc(92vh);box-shadow:0 0 0 0" 	
        @change="change"
        :placeholder="mdPlaceHolder"
        ref="md"
        :ishljs="true"
        fontSize="13px"
        v-model="value"
      />
    </div>
    <!-- 点击了发表后给一个hint提示框用来放文章封面 -->
    <div class="hint" ref="hint">
      <div class="header">
        <p>发布文章</p>
        <i class="el-icon-close" style="cursor:pointer" @click="close"></i>
      </div>
      <div class="tag">
        文章标签：
        <!-- <el-input v-model="tag" placeholder="请输入标签" style="width:300px;"></el-input> -->
        <el-select v-model="tag" placeholder="请选择">
          <el-option
            v-for="item in tagOptions"
            :key="item.id"
            :label="item.tagName"
            :value="item.tagKey">
          </el-option>
        </el-select>
      </div>
      <div class="introduction">
        文章简介：
        <el-input v-model="introduction" placeholder="请输入标签" style="width:300px;"></el-input>
      </div>
      <div class="coverimg">
        上传封面：(删除图片功能暂未开发)
        <!-- 明天来写这个上传封面 -->
        <el-upload
          ref="upload"
          :on-change="upload"
          action="http://localhost:8888/articla/InsertheadImg"
          :limit="1"
          list-type="picture-card"
          :on-success="uploadSuccess">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </div>
        </el-upload>
      </div>
      <div class="bShow">
        发布形式：
          <el-radio v-model="radio" label="true">公开</el-radio>
          <el-radio v-model="radio" label="false">私密</el-radio>
      </div>
      <div class="button">
        <el-button type="primary" size="small" plain @click="save">确认发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import 'mavon-editor/dist/markdown/github-markdown.min.css'
export default {
  name:'writeArticla',
  props: {},
  components: {},
  data () {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      mdPlaceHolder:'暂时不可输入单引号在代码块中',
      codeStyle:'monokai-sublime',
      title:"",
      value:"",
      render:"",
      files:[],
      headimg:'',
      // 标签
      tag:"",
      tagOptions:[],
      // 上传封面
      coverimg:'', // 封面图片
      disabled: false,
      radio: '1',
      introduction:'',
      bNewAdd:true, //'是否新建'
      likes:'',
      views:'',
    };
  },

  created() {
    this.bNewAdd = true
    // 如果是从文章管理中跳转过来想要修改页面内容的
    if(this.$route.params){
      this.bNewAdd = false
      let data = this.$route.params
      console.log(data,'data')
      this.title = data.title
      this.value = data.mdContain
    }
    // 在页面创建时就调出是否含有缓存的html
    // 在页面打开的时候去调用数据库login 中chenyuelin用户名的头像
    this.headimg = JSON.parse(sessionStorage.getItem('login')).imgurl
    this.gettagOptionsData()
  },
  methods: {
    gettagOptionsData(){
      this.$axios.get('articla/getTagData').then(res=>{
        this.tagOptions = res.data.msg
      })
    },
    //监听markdown变化
    change(value, render) {
      // 第一个参数是文字 第二个参数是html格式
      // console.log(value);
      // console.log(render);
      this.value = value
      this.render = render
    },
    // 点击保存草稿
    savesDraft(){
      let draft = {
        headimg:this.headimg,
        username:JSON.parse(sessionStorage.getItem('login')).username,
        title:this.title?this.title:'无标题', // 标题
        coverimg:null, // 封面图片
        contain:this.render, // 文章内容 html格式
        mdContain:this.value, // 文章内容md格式
        tag:null, // 标签key
        private:'false', // 是否公开,
        introduction:null, // 简介
        isDraft:1, // 草稿
        likes:this.$route.params.likes,
        views:this.$route.params.views,
        id:this.$route.params.id
      }
      if(this.bNewAdd){
        this.$axios.post("articla/publish",draft).then(res=>{
          if(res.data.code == '200'){
            this.$message.success("草稿保存成功")
            this.$router.push('/')
          }
        })
      }else{
        this.$axios.post("articla/updateArticle",draft).then(res=>{
          if(res.data.code == '200'){
            this.$message.success("草稿保存成功")
            // this.$router.push('/')
          }
        })
      }
      // // 设置localStroage的失效时间 expires
      // let data = new Date().getTime();
      // // console.log(data)
      // sessionStorage.setItem("font",this.value,data+1440*2000)
      // sessionStorage.setItem("title",this.title)
    },
    //上传图片接口pos 表示第几个图片 
    // (pos:表示第几个图片, file: File Object)
    handleEditorImgAdd(pos, file){
      console.log(file,'file')
      var formdata = new FormData();
      formdata.append("file",file)
      this.$axios.post("articla/mdimg",formdata).then(res=>{
        let url = res.data.result[0].imgurl
        this.$refs.md.$img2Url(pos, url) //通过ref插入到文档中 将src的base64改为url格式
        console.log('调用',this.render)
      })
    },
    handleEditorImgDel(){
      console.log('handleEditorImgDel');  
    },
    // 点击了确认发送
    save(){
      let params = {
        headimg:this.headimg,
        username:JSON.parse(sessionStorage.getItem('login')).username,
        title:this.title, // 标题
        coverimg:this.coverimg, // 封面图片
        contain:this.render, // 文章内容 html格式
        mdContain:this.value, // 文章内容md格式
        tag:this.tag, // 标签key
        private:this.radio, // 是否公开,
        introduction:this.introduction, // 简介
        isDraft:0 // 是否是草稿
      }
      // 如果是新建的markdown，则直接调用保存新的文章接口
      if(this.bNewAdd){
        this.$axios.post("articla/publish",params).then(res=>{
          if(res.data.code == '200'){
            this.$message.success("发布成功")
            this.$router.push('/')
          }
        })
      }else{
        params.id = this.$route.params.id
        // 如果是从文章管理跳转过来的，说明是有数据的，调用update接口
        this.$axios.post("articla/updateArticle",params).then(res=>{
          if(res.data.code == '200'){
            this.$message.success("发布成功")
            this.$router.push('/')
          }
        })
      }
      
    },
    close(){
      this.$refs.hint.style.cssText = "height:0px"
    },
    // 点击了发表文章
    publish(){
      this.$refs.hint.style.cssText = "height:500px"
    },

    // 上传封面的函数
    upload(file,filelist){
      console.log(file,filelist)
      console.log("上传封面")
    },
    // 上传封面成功的回调
    uploadSuccess(response, file, fileList){
      console.log(response,'res')
      this.coverimg = response.result[0].imgurl
    },
    handleRemove(file,filelist){
      console.log("移除图片")
      file.url = ""
      filelist = []
      this.$refs.upload.clearFiles()
      console.log(file,filelist)
    }

   
  },

  computed: {},

  watch: {
    // radio(news,olds){
    //   console.log(news)
    // }
  }
}

</script>
<style lang='scss' scoped>
#edit{
  position: relative;
  .header{
    width: 100%;
    // calc(8vh) 视窗高度的8%
    height: calc(8vh);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;;
    .alls{
      width: 90%;
      height: 60px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .return{
        width: 7%;
        i{
          font-size: 1.5rem;
        }
      }
      .title{
        width: 70%;
      }
      .Save{
        width: 100px;
        margin-left: 10px;
      }
      .publish{
        width: 100px;
        margin-left: 10px;
      }
      .headimg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgb(255, 195, 195);
        margin-left: 20px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
  .hint{
    width: 700px;
    // height: 500px;
    height: 0;
    overflow: hidden;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2000;
    transition: 0.3s;
    box-shadow: 0 0 10px 1px rgb(229, 229, 229);
    .header{
      background-color: rgb(255, 255, 255);
      display: flex;
      width: 660px;
      justify-content: space-between;
      margin: 0 auto;
      border-bottom: 1px solid rgba(194, 194, 194, 0.158);
      p{
        font-size: 1.4rem;
        font-weight: 600;
      }
    }
    .tag{
      margin-top: 20px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // width: 450px;
      width: 100%;
      padding-left: 20px;
    }
    .introduction{
      margin-top: 20px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // width: 450px;
      margin-bottom: 20px;
      width: 100%;
      padding-left: 20px;
    }
    .coverimg{
      margin-top: 20px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // width: 555px;
      overflow: hidden;
      width: 100%;
      padding-left: 20px;
      p{
        position: absolute;
        top: 170px;
        left: 20px;
      }
      .el-upload-list__item-delete {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 20px;
        display: block;
      }
    }
    .bShow{
      margin-top: 20px;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      // width: 350px;
      width: 100%;
      padding-left: 20px;
    }
    .button{
      margin-top: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }
  }
  /deep/ .el-upload--picture-card{
    width: 100px;
    height: 100px;
    font-size: 16px !important;
  }
  /deep/ .el-upload{
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 16px;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 16px;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item-actions:hover {
    opacity: 1;
    font-size: 16px;
  }

  /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 16px;
  }
}

</style>