<template>
  <div class="left_contain">
    <div class="header">首页中间文章管理</div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="700">
        <el-table-column label="序号" fixed prop="" width="80" align="center">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="180"></el-table-column>
        <el-table-column label="标题" prop="title" width="200"></el-table-column>
        <el-table-column label="简介" prop="introduction" width="280"></el-table-column>
        <el-table-column label="头像" prop="headimg" width="100">
          <template slot-scope="scope">
            <img style="width:80px;height:80px;overflow:hidden" :src="scope.row.headimg" alt="">
          </template>
        </el-table-column>
        <el-table-column label="上传日期" prop="updateTime" width="280"></el-table-column>
        <el-table-column label="封面" prop="coverimg" width="180">
          <template slot-scope="scope">
            <img style="width:120px;height:120px;overflow:hidden" :src="scope.row.headimg" alt="">
          </template>
        </el-table-column>
        <el-table-column label="浏览量" prop="views" width="100"></el-table-column>
        <el-table-column label="点赞量" prop="likes" width="100"></el-table-column>
        <el-table-column label="文章分类" prop="types" width="180">
          <template slot-scope="scope">
            {{tagtable.tagKey == scope.row ? tagtable.tagName:'1'}}
          </template>
        </el-table-column>
        <el-table-column label="内容" prop="contain" width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.contain.replace(/<img/g,`<img style='width:100px;height:100px'`)" class="scopeImg"></div>
          </template>
        </el-table-column>
        <el-table-column label="是否公开" prop="private" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            {{scope.row.private == 'true'?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="bShow" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button @click="deletCard(scope.row,scope.$index)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="editCard(scope.row,scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改文章" :visible.sync="dialogFormVisible.show">
        <el-form :model="form">
          <el-form-item label="文章标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章简介" :label-width="formLabelWidth">
            <el-input v-model="form.introduction" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" :label-width="formLabelWidth">
            <el-select v-model="form.types" placeholder="请选择">
              <el-option
                v-for="item in tagOptions"
                :key="item.id"
                :label="item.tagName"
                :value="item.tagKey">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否公开" :label-width="formLabelWidth">
            <el-radio-group v-model="form.private">
              <el-radio label="true">公开</el-radio>
              <el-radio label="false">私密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCard">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      tagtable:[],
      dialogFormVisible:{
        show:false,
        index:0
      },
      formLabelWidth:'120px',
      form:{},
      tagOptions:[],
    }
  },
  created(){
    this.gettagOptionsData()
    this.gettagtableData()
    this.gettableData()
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    gettagOptionsData(){
      this.$axios.get('articla/getTagData').then(res=>{
        this.tagOptions = res.data.msg
      })
    },
    gettableData(){
      this.$axios.get(`development/getCardData`).then(res=>{
        console.log(res.data,'data')
        this.tableData = res.data.msg
      })
    },
    gettagtableData(){
      this.$axios.get(`articla/getTagData`).then(res=>{
        this.tagtable = res.data.msg
      })
    },
    // 删除该条数据
    deletCard(val,index){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(`development/deletCardData`,{id:val.id}).then(res=>{
          if(res.data.code=='200'){
            this.$message.success('删除成功')
            this.tableData.splice(index,1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    editCard(val,index){
      this.dialogFormVisible.show = true
      this.dialogFormVisible.index = index
      this.form = val
    },
    updateCard(){
      this.$axios.post(`development/updateCardData`,this.form).then(res=>{
        if(res.data.code=='200'){
          this.tableData[this.dialogFormVisible.index] = this.form
          this.dialogFormVisible.show = false
          this.$message.success('更新成功')
        }
      })
    },
  },
}

</script>
<style lang='scss'>
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
}
.scopeImg{
 
}
</style>
