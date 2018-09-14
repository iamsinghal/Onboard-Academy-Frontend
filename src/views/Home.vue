<template>
  <div class="home">
    <img src="../assets/oa-logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>


<style lang="stylus" scoped>
.home
  img
    max-width 300px
    padding 20px
</style>



<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
