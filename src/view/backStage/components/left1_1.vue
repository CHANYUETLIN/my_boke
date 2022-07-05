<template>
  <div class="left_contain">
    <div class="header">首页右侧轮播图管理</div>
    <div class="upload">
      <el-upload
        action="http://localhost:8888/development/bannerUpload"
        list-type="picture-card"
        multiple
        :show-file-list="true"
        :http-request="uploadImg">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div class="table">
      <div class="search">
        <div class="search_input">
          <div>
            图片名称：
            <el-input
              size="mini"
              placeholder="图片名称"
              prefix-icon="el-icon-search"
              v-model="search.name">
            </el-input>
          </div>
          <div>
            上传日期
            <el-input
              size="mini"
              type="date"
              placeholder="上传日期"
              prefix-icon="el-icon-date"
              v-model="search.date">
            </el-input>
          </div>
          <div>
            是否显示
            <el-select size="mini" v-model="search.bShow" placeholder="请选择">
              <el-option
                v-for="item in bShow"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button size="mini" @click="searchData">搜索</el-button>
      </div>
      <el-table
        :data="ImgtableData"
        border
        height="500"
        style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="80">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          min-width="400"
          v-for="(item,index) in ImgHeader" 
          :key="index"
          :minWidth="item.width"
          :prop="item.prop"
          :label="item.name">
          <template slot-scope="scope">
            <img v-if="item.prop=='image'" :src="scope.row.imgurl" alt="" style="width:55px;height:55px;overflow:hidden">
            <span v-if="item.prop=='bShow'">
              {{scope.row.bShow == 'true'?'是':'否'}}
            </span>
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="showImg(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="deleteImg(scope.row,scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="查看图片"
      :visible.sync="centerDialogVisible"
      width="45%"
      center>
      <img style="width:600px;height:600px" :src="showBigImg" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList:[],
      ImgtableData: [],
      ImgHeader:[
        {prop:'name',name:'图片名称',width:'150'},
        {prop:'image',name:'缩略图',width:'60'},
        {prop:'imgurl',name:'图片地址',width:'400'},
        {prop:'dateTime',name:'上传日期',width:'150'},
        {prop:'bShow',name:'是否显示',width:'80'}
      ],
      centerDialogVisible:false,
      showBigImg:'',
      search:{name:'',date:'',bShow:''},
      bShow:[{value:true,label:'是'},{value:false,label:'否 '}]
    }
  },
  created(){
    this.getTableData()
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    uploadImg(f){
      let formData = new FormData();
      formData.append("file", f.file);
      this.$axios.post('development/bannerUpload',formData).then(res=>{
        console.log(res,'res')
        if(res.data.result[0].code == '200'){
          this.$message.success('上传成功')
        }else{
          this.$message.error('上传失败')
        }
        this.getTableData()
      })
    },
    // 获取表格数据
    getTableData(){
      this.$axios.get(`development/getImageTableData`).then(res=>{
        this.ImgtableData = res.data.msg
      })
    },
    // 查看大图
    showImg(val){
      console.log(val)
      this.centerDialogVisible = true
      this.showBigImg = val.imgurl
    },
    // 删除数据
    deleteImg(val,index){
      console.log(val,index,'val')
      this.$axios.post('development/deleteImageTableData',val).then(res=>{
        if(res.data.code == '200'){
          this.$message.success("删除成功")
          this.ImgtableData.splice(index,1)
        }
      })
    },
    searchData(){
      console.log(this.search.bShow)
      this.$axios.get(`development/getImageTableData?bShow=${this.search.bShow}`).then(res=>{
        this.ImgtableData = res.data.msg
      })
    },
  },
}

</script>
<style scoped lang='scss'>
.left_contain{
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 10px;
  .header{
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid rgb(233, 233, 233);
  }
  .upload{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    .uploadList{
      display: flex;
      margin-left: 10px;
      img{
        margin-right: 10px;
      }
    }
  }
}
.search{
  margin-bottom: 20px;
  padding: 0 2px;
  display: flex;
  align-items: center;
  .search_input{
    display: flex;
    align-items: center;
    width: 100%;
    div{
      width: 50%;
      margin-right: 20px;
    }
  }
}
/deep/ .el-dialog__body{
  display: flex;
  justify-content: center;
}
/deep/ .el-dialog{
  margin-top: 40px!important;
}
</style>
