<template>
  <div class="tab">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-home"></i> 首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props:{
    breadcrumb:{
      type:Array,
      require:false,
    }
  },
  data() {
    return {

    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{

  },
}

</script>
<style scoped>
.tab{
  width: 100%;
  height: 30px;
  background: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 10px 0;
}
</style>
