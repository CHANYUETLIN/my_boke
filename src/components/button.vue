<template>
  <div class="button">
    <button @click="ClickButton">{{title}}</button>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      require:false,
      default(){
        return "登陆"
      }
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
    ClickButton(){
      this.$emit('click')
    }
  },
}

</script>
<style scoped>
.button{
  display: flex;
  justify-content: center;
  text-align: center;
}
button{
  width: 100px;
  height: 35px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgb(217 217 217);
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 500;
}
button:hover{
  background: rgb(243, 227, 255);
  border: 1px solid rgb(225, 189, 255);
  color: rgb(144, 49, 222);
  cursor: pointer;
  transition: 0.1s;
}
</style>
