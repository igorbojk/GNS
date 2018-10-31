<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  created(){
    // this.$store.dispatch('GET_JSON');
  }
}
</script>

<style>
  .text-right{
    text-align: right;
  }
</style>
