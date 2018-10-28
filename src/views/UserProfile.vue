<template>
  <div>
    <v-tabs
        dark
        fixed-tabs
        slot="extension"
        v-model="tabs"
        centered
        color="secondary"
        slider-color="floralWhite"
      >
        <v-tab>
          Profile
        </v-tab>
        <v-tab>
          Settings
        </v-tab>
        <!-- Profile Tab Content -->
        <v-tab-item>
        <EditProfile />
        </v-tab-item>
      <!-- Setting Tab Content -->
      <v-tab-item>
        <v-card color="floralWhite" class="tab__cards">
          <v-card-text>
            Setting Content
          </v-card-text>
        </v-card>
      </v-tab-item>
      </v-tabs>
  </div>  
</template>

<script>
import EditProfile from "../components/EditProfile.vue";
export default {
  name: "UserProfile",
  components: {
    EditProfile
  },
  data: () => ({
    tabs: null,
    profileTabContent: {
      name: "",
      email: ""
    },
    settingTabContent: null
  }),
  mounted() {
    this.profileTabContent = this.$store.state.viewer;
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";

.v-tabs__div {
  width: calc(100% / 2);
  max-width: 100%;
  font-size: 18px;
}
</style>
