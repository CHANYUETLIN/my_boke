<template>
  <div>
    <ctab :breadcrumb="breadcrumb"></ctab>
    <div class="contain">
      <div class="left">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="1-1"
              class="el-menu-vertical-demo"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>图片管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">轮播图管理</el-menu-item>
                  <el-menu-item index="1-2">文章管理</el-menu-item>
                  <el-menu-item index="1-3">左侧</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-4">文章</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <leftoneTOone v-show="indexShow == '1-1'"></leftoneTOone>
        <leftoneToTwo v-show="indexShow == '1-2'"></leftoneToTwo>
      </div>
    </div>
  </div>
</template>

<script>
import leftoneToTwo from './components/left1_2.vue'
import leftoneTOone from './components/left1_1.vue'
export default {
  components: {leftoneTOone,leftoneToTwo },
  name:'development',
  data() {
    return {
      breadcrumb:[{name:'开发管理',path:''}],
      indexShow:'1-1'
    }
  },
  mounted(){

  },
  computed:{

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
