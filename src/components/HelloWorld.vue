<template>
  <div class="hello">

    <input type="text" v-model="content">
    <button @click="addTodo"> 添加 </button>
    <button @click="broadcast"> 广播 </button>
    <child-todo name="one"></child-todo>
    <child-todo name="two"></child-todo>
    <ul>
      　　 <li v-for="value in todo" :key="value">
        　　　　{{ value }}
        　　 </li>
    </ul>


  </div>
</template>

<script>
  import Vue from 'vue'
  // 子组件
  Vue.component('child-todo', {
    props: ['name'],
    data: function () {
      return {
        content: ''
      }
    },
    template: '<div>\
　　　　Child {{name}} \
　　　　<input type="text" v-model="content"/> \
　　　　<button @click="add"> 添加 </button> \
　　 </div>',
    methods: {
      add: function () {
        // 将事件向上派发，这样既修改了父组件中的 todo 属性，又不直接访问父组件
        this.$dispatch('add', 'Child ' + this.name + ': ' + this.content);
        this.content = '';
      }
    },
    events: {
      // 用于接收父组件的广播
      'to-child': function (msg) {
        this.$dispatch('add', 'Child ' + this.name + ': ' + msg);
      }
    }
  });


  export default {
    name: 'HelloWorld',
    data() {
      return {
        todo: [],
        content: ''

      }
    },
    methods: {
      addTodo: function () {
        // 触发自己实例中的事件
        this.$emit('add', 'Parent: ' + this.content);
        this.content = '';
      },
      broadcast: function () {
        // 将事件广播，使两个子组件实例都触发 to-child 事件
        this.$broadcast('to-child', this.content);
        this.content = '';
      }
    },
    events: {
      'add': function (msg) {
        this.todo.push(msg);
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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