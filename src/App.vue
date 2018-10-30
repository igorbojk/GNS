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
    // this.$store.dispatch('GET_JSON');
    // this.$store.dispatch('SET_LIST');
  }
}
</script>

<style>
  .text-right{
    text-align: right;
  }
</style>
