<!--
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-11-06 14:38:59
 * @LastEditors: 
 * @LastEditTime: 2019-11-06 18:39:09
 -->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
