<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  font-size: 14px;
  
}
#app {
  margin: 0;
  padding: 0;
}
ul,li{
  list-style: none;
}
/*-------滚动条整体样式----*/
::-webkit-scrollbar {
  width:5px;
  height:10px;
}
  /*滚动条里面小方块样式*/
::-webkit-scrollbar-thumb {
  border-radius:100px;
  -webkit-box-shadow:inset 0 0 5px rgb(255, 255, 255);
  background:rgb(128, 141, 255);
}
  /*滚动条里面轨道样式*/
::-webkit-scrollbar-track {
  -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
  border-radius:0;
  background:rgb(255, 255, 255);
}
</style>
