<template>
  <div id="app">
    <List></List>
  </div>
</template>

<script>
import List from './components/list/list.vue'

export default {
  name: 'app',
  components: {
    List
  },
    created(){
      console.log(this.$store.state.test)
    }
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
