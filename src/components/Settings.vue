<template>
  <v-card color="floralWhite" class="setting_card">
          <h2>
           Privacy Settings
          </h2>
          <br>
          <span>Share your details to public</span>
          <v-switch color="primary" label="Facebook URL" v-model="isFbUrlVisible"/>
          <v-switch color="primary" label="Contact number" v-model="isPhoneVisible"/>
          <v-switch color="primary" label="Email" v-model="isEmailVisible"/>
          <v-btn class="update_btn" @click="updateSettings()" round color="success">Update</v-btn>
        </v-card>
</template>

<script>
import axios from "axios";
import { API_URLS } from "@utilities/constants";

export default {
  name: "Settings",
  data: () => ({
    isFbUrlVisible: false,
    isPhoneVisible: false,
    isEmailVisible: false
  }),

  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.USER_SETTINGS)
      .then(res => {
        if (!res.data) {
          return;
        }
        const { mobile, facebookUrl, email } = res.data.settings;
        this.isPhoneVisible = mobile;
        this.isFbUrlVisible = facebookUrl;
        this.isEmailVisible = email;
      })
      .catch(err => {
        if (err.response.data.message) {
          console.log(err);
        }
      });
  },
  methods: {
    updateSettings() {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .post(API_URLS.USER_SETTINGS, {
          mobile: this.isPhoneVisible,
          email: this.isEmailVisible,
          facebookUrl: this.isFbUrlVisible
        })
        .then(res => {
          if (!res.data) {
            return;
          }
        })
        .catch(err => {
          if (err.response.data.message) {
            console.log(err);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.setting_card {
  max-width: 80%;
  padding: 24px;
  text-align: left;
  margin: 24px auto;
  border-radius: 8px;
}

.update_btn {
  display: block;
  margin-left: auto;
}
</style>
