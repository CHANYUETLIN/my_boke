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
                  <span>首页</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">右侧</el-menu-item>
                  <el-menu-item index="1-2">中间</el-menu-item>
                  <el-menu-item index="1-3">左侧</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <leftoneTOone></leftoneTOone>
      </div>
    </div>
  </div>
</template>

<script>
import leftoneTOone from './components/left1_1.vue'
export default {
  components: {leftoneTOone, },
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
