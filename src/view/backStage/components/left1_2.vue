<template>
  <div class="left_contain">
    <div class="header">首页中间文章管理</div>
    <div>
      <div class="tablebc">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-row-style="{color:'#555',fontSize:'14px'}"
          :header-cell-style="{background:'rgb(248,248,248)'}"
          :row-style="{height: '45px'}"
          :cell-style="{padding:'5px 0'}"
          height="625">
          <el-table-column label="序号" fixed prop="" width="80" align="center">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="username" width="180"></el-table-column>
          <el-table-column label="标题" prop="title" width="200">
            <template slot-scope="scope">
              <p v-if="scope.row.mdContain" class="linkP" @click="toWriteArticla(scope.row,scope.$index)">{{scope.row.title}}</p>
              <p v-else>{{scope.row.title}}</p>
            </template>
          </el-table-column>
          <el-table-column label="简介" prop="introduction" width="280"></el-table-column>
          <el-table-column label="头像" prop="headimg" width="85">
            <template slot-scope="scope">
              <img style="width:60px;height:60px;overflow:hidden" :src="scope.row.headimg" alt="">
            </template>
          </el-table-column>
          <el-table-column label="上传日期" prop="updateTime" width="280"></el-table-column>
          <el-table-column label="封面" prop="coverimg" width="80">
            <template slot-scope="scope">
              <img style="width:60px;height:60px;overflow:hidden" :src="scope.row.coverimg" alt="">
            </template>
          </el-table-column>
          <el-table-column label="浏览量" prop="views" width="100"></el-table-column>
          <el-table-column label="点赞量" prop="likes" width="100"></el-table-column>
          <el-table-column label="文章分类" prop="types" width="180">
            <template slot-scope="scope">
              {{tagtable.tagKey == scope.row ? tagtable.tagName:'1'}}
            </template>
          </el-table-column>
          <el-table-column label="内容" prop="contain" width="300" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <div v-html="scope.row.contain.replace(/<img/g,`<img style='width:60px;height:60px'`)" class="scopeImg"></div> -->
              <div class="scopeImg">{{scope.row.contain}}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否公开" prop="private" width="100" fixed="right" align="center">
            <template slot-scope="scope">
              {{scope.row.private == 'true'?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column label="是否草稿" prop="private" width="100" fixed="right" align="center">
            <template slot-scope="scope">
              {{scope.row.isDraft == 1?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="bShow" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button @click="deletCard(scope.row,scope.$index)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small" @click="tobokeDetail(scope.row,scope.$index)">查看</el-button>
              <el-button type="text" size="small" @click="editCard(scope.row,scope.$index)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        res.data.msg.forEach(item => {
          if(item.bShow == 'true'){
            this.tableData.push(item)
          }
        });
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
    // 跳转到文章详情
    tobokeDetail(row){
      this.$router.push({name:'bokeDetail',params:{contain:row,page:'left1_2'}})
    },
    // 跳转到文章编辑处
    toWriteArticla(row,index){
      this.$router.push({name:'articla',params:row})
    }
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
    margin-bottom: 10px;
  }
}
.scopeImg{
 
}
.tablebc{
  width: 100%;
  padding: 10px;    
  border-radius: 5px;
  box-shadow: 0px 0px 7px 0px #dadada;
}
.linkP{
  color: rgb(68, 177, 255);
  cursor: pointer;
}
</style>
