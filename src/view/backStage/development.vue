<template>
  <div>
    <ctab :breadcrumb="breadcrumb"></ctab>
    
  </div>
</template>

<script>
import ctab from '../../components/ctab.vue'
export default {
  components: { ctab },
  name:'development',
  data() {
    return {
      breadcrumb:[{name:'开发管理',path:''}],
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
<style scoped lang='scss'>

</style>
