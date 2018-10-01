<template>
  <div>
        <!-- Navigation Drawer -->
    <v-navigation-drawer
        v-model="drawer"
        right
        temporary
        fixed
        app
        >
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

    <!-- Toolbar  -->
    <v-toolbar app color="#faf8f2" class="app-toolbar" flat height="80">
      <router-link to="/">
        <img
        class="organiztion-logo"
        src="../assets/images/oc-logo-transparent.png"
        alt="Onboard Canada Logo"
      >
      </router-link>
        <v-spacer v-if="isMobileScreen" />
      <v-toolbar-title>
          ONBOARD CANADA
      </v-toolbar-title>
      <template v-if="!isMobileScreen"> 
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn round flat>BLOG</v-btn>
        <v-btn round flat>FIND BUDDY</v-btn>
        <v-btn round flat>HELP</v-btn>
        <hr class="hr--long">
        <v-btn to="/login" round flat >LOG IN</v-btn>
        <v-btn outline round color="#f38b4c" to="/signup">SIGN UP FOR FREE</v-btn>
      </template>
      <template v-if="isMobileScreen">
        <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </template>
    </v-toolbar>
</div>
</template>

<style lang="scss" scoped>
@import "../styles/_breakpoints.scss";

.app-toolbar {
  // background-color: transparent !important; // Override Vuetify

  & /deep/ .v-btn__content {
    letter-spacing: 2px;
  }
}

.hr--long {
  max-height: 48px;
  height: 100%;
}

.organiztion-logo {
  padding: 4px;
  max-width: 70px;

  @include xsDown {
    max-width: 50px;
  }
}

.v-toolbar__title {
  margin: 0 8px !important;
  font-weight: 100;
  letter-spacing: 2px;

  @include xxsDown {
    display: none;
  }
}

.v-divider {
  max-height: 100px;
}
</style>

<script>
export default {
  name: "TheAppToolbar",
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "dashboard" },
      { title: "About", icon: "question_answer" }
    ]
  }),
  computed: {
    isMobileScreen() {
      return this.$vuetify.breakpoint.name === "xs";
    }
  }
};
</script>
