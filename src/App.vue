<template>
  <div id="app">
    <v-app>
      <TheAppToolbar />
      <v-content>
        <router-view />
      </v-content>
      <!-- <BottomNavBar v-if="isMobileScreen"/> -->
    </v-app>
  </div>
</template>

<style lang="stylus">
@font-face {
font-family: "Apercu";
src: url("./assets/fonts/apercu_regular.woff2");
}

@font-face {
font-family: "Apercu-bold";
src :url("./assets/fonts/apercu_bold.woff2");
}

#app {
  font-family: 'Apercu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.application {
  letter-spacing: 2px;
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
import BottomNavBar from "@/components/BottomNavBar";
export default {
  name: "App",
  components: {
    TheAppToolbar,
    BottomNavBar
  },
  computed: {
    isMobileScreen() {
      return this.$vuetify.breakpoint.name === "xs";
    }
  }
};
</script>
