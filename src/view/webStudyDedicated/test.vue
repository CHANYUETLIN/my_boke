<template>
  <div>
    <div class="padding">
      {{show}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:''
    }
  },
  mounted(){

  },
  created(){  
    this.show = '123'
  },
  computed:{

  },
  methods:{

  },
}

</script>
<style scoped lang='scss'>
.padding{
  padding: 20px 20px;
}
</style>
