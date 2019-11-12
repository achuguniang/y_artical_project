<!--
 * @Description: 
 * @Version: 
 * @Author: WangYue
 * @Date: 2019-11-06 14:38:59
 * @LastEditors: 
 * @LastEditTime: 2019-11-12 10:37:45
 -->
<template>
  <div class="app">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <van-icon name="search" slot="right" />
    </van-nav-bar>

  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      todo: [],
      content: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>