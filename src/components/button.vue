<template>
  <div class="button">
    <button ref="button" @mousedown="mousedown" @mouseup="mouseup" @click="ClickButton">{{title}}</button>
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
    },
    mousedown(){
      this.$refs.button.style = "background: rgb(226, 189, 255);"
    },
    mouseup(){
      this.$refs.button.style = "background: rgb(243, 227, 255);"
    },
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
  border: 1px solid rgb(223, 223, 223);
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}
button:hover{
  background: rgb(243, 227, 255);
  border: 1px solid rgb(225, 189, 255);
  color: rgb(144, 49, 222);
  cursor: pointer;
  transition: 0.14s;
}
</style>
