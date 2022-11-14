<template>
  <div>
    <ctab :breadcrumb="breadcrumb"></ctab>
    <div class="contain">
      <div class="left">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>首页管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">轮播图管理</el-menu-item>
                  <el-menu-item index="1-2">文章管理</el-menu-item>
                  <el-menu-item index="1-3">书签管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-4">用户管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <leftoneTOone v-if="indexShow == '1-1'"></leftoneTOone>
        <leftoneToTwo v-if="indexShow == '1-2'"></leftoneToTwo>
        <leftoneToThree v-if="indexShow == '1-3'"></leftoneToThree>
        <leftTwoToOne v-if="indexShow == '2-4'"></leftTwoToOne>
      </div>
    </div>
  </div>
</template>

<script>
import leftTwoToOne from './components/left2_1.vue'
import leftoneToTwo from './components/left1_2.vue'
import leftoneToThree from './components/left1_3.vue'
import leftoneTOone from './components/left1_1.vue'
export default {
  components: {leftoneTOone,leftoneToTwo,leftoneToThree,leftTwoToOne },
  name:'development',
  data() {
    return {
      breadcrumb:[{name:'开发管理',path:''}],
      indexShow:'1-1',
      defaultActive:'1-1'
    }
  },
  mounted(){

  },
  computed:{

  },
  created(){
    console.log(this.$route.query)
    if(this.$route.query.indexShow){
      this.indexShow = JSON.parse(JSON.stringify(this.$route.query.indexShow))
      this.defaultActive = this.$route.query.indexShow
    }
  },
  methods:{
    // 选中菜单 index: 选中菜单项的index, indexPath: 选中菜单项的 index path
    handleSelect(index, keyPath) {
      this.indexShow = index
    }
  },
}

</script>
<style scoped lang='scss'>
.contain{
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left{
    width: 15%;
    height: 100%;
    background: #545c64;
  }
  .right{
    padding: 10px;
    background: #efefef;
    width: 85%;
    height: 100%;
  }
}
/deep/ .el-menu{
  border-right: 1px solid #545c64;
}
</style>
