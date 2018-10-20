<template>
  <div>
    <v-tabs
        align-with-title
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

        <v-tab-item>
        <v-card color="floralWhite" class="tab__cards">
          <v-card-text>
           <label> Name:</label> {{profileTabContent.name}}
          </v-card-text>
          <v-card-text>
           <label> Email:</label> {{profileTabContent.email}}
          </v-card-text>
        </v-card>
      </v-tab-item>
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
export default {
  name: "UserProfile",
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
</style>
