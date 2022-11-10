<template>
  <div class="left_contain">
    <div class="header">用户管理</div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column label="序号" fixed prop="" width="50" align="center">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="头像" prop="imgurl" width="80">
          <template slot-scope="scope">
            <img style="width:60px;height:60px" :src="scope.row.imgurl" alt="">
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="180"></el-table-column>
        <el-table-column label="昵称" prop="nickname" width="180"></el-table-column>
        <el-table-column label="用户身份" prop="dechema" width="150">
          <template slot-scope="scope">
            <el-select @change="changeDechema($event,scope.row)" v-model="scope.row.dechema" placeholder="请选择" size="mini" :disabled="!scope.row.bEdit">
              <el-option
                v-for="item in dechemaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="sex" width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.sex == '1'?'女':'男'}}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
        <el-table-column label="电话" prop="phone" width="180"></el-table-column>
        <el-table-column label="个人网址" prop="url" width="180"></el-table-column>
        <el-table-column label="描述" prop="described" width="280"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="EditData(scope.row)" type="text" size="small">{{scope.row.bEdit?'取消':'编辑'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      dechemaOptions:[{value:0,label:'普通用户'},{value:1,label:'管理员'},{value:2,label:'开发管理员'}],
    }
  },
  mounted(){

  },
  created(){
    this.getUserData()
  },
  computed:{

  },
  methods:{
    getUserData(){
      this.$axios.get(`development/AlluserData`).then(res=>{
        this.tableData = res.data.msg
      })
    },
    EditData(row){
      row.bEdit = !row.bEdit
    },
    changeDechema(val,row){
      console.log(row,val,"change12")
      let params = {
        id:row.id,
        dechema:val
      }
      this.$axios.post(`development/updateUserDechema`,params).then(res=>{
        if(res.data.code == '200'){
          this.$message.success('用户信息更新成功')
          row.bEdit = false
        }
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
    margin-bottom: 10px;
  }
}
</style>
