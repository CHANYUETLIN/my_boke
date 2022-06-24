<template>
  <div>
    <div class="input">
      <el-input
        v-for="(item,index) in searchData" :key="index"
        size="mini"
        :type="item.sType"
        :placeholder="item.placeholder"
        :suffix-icon="item.sType == 'date'||'dateTime' ? 'el-icon-date':''"
        v-model="item.sValue">
      </el-input>
    </div>
    <div>
      <el-button @click="test">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    // [{skey:'',sValue:'',palceholder:'',sType:'',},{}]
    searchData:{
      type:Array,
      require:true,
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
    test(){
      console.log()
    },
  },
}

</script>
<style scoped lang='scss'>
.input{
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
