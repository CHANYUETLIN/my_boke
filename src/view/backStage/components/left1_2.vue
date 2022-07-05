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
        <el-table-column label="头像" prop="headimg" width="100">
          <template slot-scope="scope">
            <img style="width:80px;height:80px;overflow:hidden" :src="scope.row.headimg" alt="">
          </template>
        </el-table-column>
        <el-table-column label="更新日期" prop="updateTime" width="280"></el-table-column>
        <el-table-column label="封面" prop="coverimg" width="180">
          <template slot-scope="scope">
            <img style="width:120px;height:120px;overflow:hidden" :src="scope.row.headimg" alt="">
          </template>
        </el-table-column>
        <el-table-column label="简介" prop="introduction" width="280"></el-table-column>
        <el-table-column label="浏览量" prop="views" width="100"></el-table-column>
        <el-table-column label="点赞量" prop="likes" width="100"></el-table-column>
        <el-table-column label="文章分类" prop="types" width="180">
          <template slot-scope="scope">
            {{tagtable.tagKey == scope.row ? tagtable.tagName:'1'}}
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" width="200"></el-table-column>
        <el-table-column label="内容" prop="contain" width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.contain.replace(/<img/g,`<img style='width:100px;height:100px'`)" class="scopeImg"></div>
          </template>
        </el-table-column>
        <el-table-column label="是否公开" prop="bShow" width="100" fixed="right" align="center">
          <template slot-scope="scope">
            {{scope.row?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="bShow" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
      tagtable:[],
    }
  },
  created(){
    this.gettagtableData()
    this.gettableData()
  },
  mounted(){

  },
  computed:{

  },
  methods:{
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
