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
        <v-btn v-if="!isAuthenticated" to="/login" round flat >LOG IN</v-btn>
        <v-btn v-if="!isAuthenticated" outline round color="#f38b4c" to="/signup">SIGN UP</v-btn>
          <v-list-tile v-if="isAuthenticated" avatar>
            <v-list-tile-avatar>
              <img :src="avatarImageUrl" alt="profileImage">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{avatarName}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click="navigator(item.url)"
            v-if="isOptionShown(item.auth)"
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
        src="@assets/images/oc-logo-transparent.png"
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
        <v-btn v-if="isAuthenticated" round flat to="/view-matches">FIND BUDDY</v-btn>
        <v-btn  v-if="isAuthenticated" round flat to="/my-buddies">MY BUDDIES</v-btn>
        <v-btn round flat to="/contact">CONTACT</v-btn>
        <hr class="hr--long">
        <v-btn v-if="!isAuthenticated" to="/login" round flat >LOG IN</v-btn>
        <v-btn v-if="!isAuthenticated" outline round color="#f38b4c" to="/signup">SIGN UP FOR FREE</v-btn>
        <span v-if="isAuthenticated" class="avatar__name">{{avatarName}}</span>
        <v-menu
          v-if="isAuthenticated"
          offset-y
          nudge-bottom="4"
          class="toolbar__avatar"
          content-class="profile__menu"
        >
          <v-avatar
            size="50"
            color="primary"
            slot="activator"
          >
    
          <img :src="avatarImageUrl" alt="profileImage">
            <!-- <span class="white--text headline">{{avatar}}</span> -->
          </v-avatar>
          <v-list dense>
            <!-- <v-subheader>Onboard Academy</v-subheader> -->
            <v-list-tile to="/profile">
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/messages">
              <v-list-tile-title>Messages</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logOut">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>
      <template v-if="isMobileScreen">
        <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </template>
    </v-toolbar>
</div>
</template>

<style lang="scss" scoped>
@import "@styles/_breakpoints.scss";

.app-toolbar {
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

  @include mdDown {
    display: none;
  }

  @include xxsDown {
    display: none;
  }
}

.v-divider {
  max-height: 100px;
}

.toolbar__avatar {
  margin-left: 20px;
}

.profile__menu {
  border-radius: 8px;
  min-width: 150px !important;
}

.avatar__name {
  margin-left: 20px;
}
</style>

<script>
import { isJwtValid } from "@utilities/auth";
import defaultAvatar from "@assets/images/avatarImage.jpeg";

export default {
  name: "TheAppToolbar",
  data: () => ({
    drawer: null,
    items: [
      { title: "Profile", icon: "account_circle", url: "/profile", auth: true },
      { title: "Find Buddy", icon: "search", url: "/view-matches", auth: true },
      { title: "My Buddies", icon: "people", url: "/my-buddies", auth: true },
      { title: "Message", icon: "message", url: "/messages", auth: true },
      { title: "Contact", icon: "info", url: "/contact", auth: false },
      {
        title: "Logout",
        icon: "power_settings_new",
        url: "/logout",
        auth: true
      }
    ],
    defaultAvatar
  }),
  computed: {
    isMobileScreen() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    isAuthenticated() {
      return this.$store.state.viewer && isJwtValid() ? true : false;
    },
    avatarName() {
      return this.$store.state.viewer.name;
    },
    avatar() {
      return this.$store.state.viewer.name.substring(0, 1);
    },
    avatarImageUrl() {
      if (!this.$store.state.viewer.picUrl) return defaultAvatar;
      return this.$store.state.viewer.picUrl;
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$store.commit("setViewer", null);
      this.$router.push("/");
    },
    navigator(url) {
      if (url === "/logout") {
        this.logOut();
        return;
      }
      this.$router.push(url);
    },
    isOptionShown(authRequired) {
      if (authRequired) {
        return this.isAuthenticated;
      } else return true;
    }
  }
};
</script>
