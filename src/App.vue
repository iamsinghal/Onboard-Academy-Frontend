<template>
  <div id="app">
    <v-app>
      <TheAppToolbar />
      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<style lang="stylus">
#app {
  font-family: 'Inconsolata', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import TheAppToolbar from "@/components/TheAppToolbar";
export default {
  name: "App",
  components: {
    TheAppToolbar
  }
};
</script>
