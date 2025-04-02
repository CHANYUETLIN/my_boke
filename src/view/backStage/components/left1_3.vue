<template>
  <div class="left_contain" style="position:relative">
    <div class="header">书签管理</div>
    <div>
      <div style="position:absolute;top:10px;left:100px">
        <el-button type="primary" size="mini" @click="addTag">添加书签</el-button>
      </div>
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
          <el-table-column label="书签名称" fixed prop="tagName" align="center">
            <template slot-scope="scope">
              <el-input :disabled="!scope.row.bEditItem" size="small" v-model="scope.row.tagName" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" fixed prop="bShow" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.bShow == 1?'是':'否'" placement="top">
                <el-switch
                  :disabled="!scope.row.bEditItem"
                  v-model="scope.row.bShow"
                  :active-value=1
                  :inactive-value=0
                  >
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="bShow" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.bEditItem" @click="editCard(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
              <el-button v-if="scope.row.bEditItem" @click="saveCard(scope.row,scope.$index)" type="text" size="small">保存</el-button>
              <el-button v-if="scope.row.bEditItem" type="text" size="small" @click="cancelCard(scope.row,scope.$index)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
    }
  },
  created(){
    this.gettagOptionsData()
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    gettagOptionsData(){
      this.$axios.get('articla/getTagData').then(res=>{
        let data = res.data.msg
        data.forEach(item => {
          item.bEditItem = false
        });
        this.tableData = data
      })
    },
    // 新建一个tag标签
    addTag(){
      let obj = {
        tagName:'',
        bShow:1,
        bEditItem:true,
        bNewAdd:true,
        tagKey:this.tableData.length // 忘记是做啥的了
      }
      this.tableData.push(obj)
    },
    // 编辑
    editCard(val,index){
      this.tableData[index].bEditItem = true
    },
    // 保存
    saveCard(val,index){
      if(val.bNewAdd){
        this.$dataBind.saveCard(`development/InsertTagTable`,val,this)
      }else{
        this.$dataBind.saveCard(`development/UpDateTagTable`,val,this)
      }
        this.tableData[index].bEditItem = false
    },
    // 取消
    cancelCard(val,index){
      this.$dataBind.cancelCard(this.tableData,val,index)
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
</style>
