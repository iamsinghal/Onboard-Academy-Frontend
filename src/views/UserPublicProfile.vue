<template>
   <div class="main-container">
    <v-card class="section-card">
      <h2 class="section-title">About</h2>
      <div class="about__container">
        <img :src="profile.picture" alt="Profile Picture">
        
        <!-- About Section -->
        <div class="about__text-fields">
          <div>Name :{{profile.user.name}}</div>
          <div v-if="profile.user.email">Email : {{profile.user.email}}</div>
        </div>
      </div>
    </v-card>
    
    <!-- Education Section -->
    <v-card class="section-card">
      <h2 class="section-title">Education</h2>
      <div>College : {{profile.institution}}</div>
      <div>Program: {{profile.program}}</div>
      <div>Session: {{profile.programSession}}</div>
    </v-card>

    <!-- Contact Information -->
    <v-card class="section-card">
      <h2 class="section-title">Contact</h2>
      <div v-if="profile.contact.mobile"> Phone: {{profile.contact.mobile}}</div>
      <div v-if="profile.user.email"> Email: {{profile.user.email}}</div>
      <div v-if="profile.contact.fbUrl"> Facebook: {{profile.contact.fbUrl}}</div>
      <div> Location: {{profile.origin}}</div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "@utilities/constants";
import defaultAvatar from "@assets/images/avatarImage.jpeg";

export default {
  name: "UserPublicProfile",
  data: () => ({
    profile: {
      user: {},
      institution: "",
      programSession: "",
      contact: {
        mobile: "",
        fbUrl: ""
      },
      program: "",
      origin: "",
      picture: ""
    },
    defaultAvatar
  }),
  mounted() {
    const userId = this.$router.history.current.params.userId;

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(`${API_URLS.PUBLIC_PROFILE}/${userId}`)
      .then(res => {
        if (!res.data) {
          return;
        }
        const { city, province, country } = res.data.origin;
        this.profile.user = res.data.user;
        this.profile.institution = res.data.institution.name;
        this.profile.programSession = res.data.session;
        this.profile.contact.mobile = res.data.mobile;
        this.profile.contact.fbUrl = res.data.facebookUrl;
        this.profile.origin = `${city}, ${province}, ${country}`;
        this.profile.program = res.data.program;
        this.profile.picture = res.data.profilePic
          ? res.data.profilePic
          : defaultAvatar;
      })
      .catch(err => {
        if (err.response.data.message) {
          console.log(err);
        }
      });
  }
};
</script>

<style lang="scss" scoped>
@import "@styles/_breakpoints.scss";

.main-container {
  padding: 24px 48px;
  text-align: center;
  margin-bottom: 100px;

  @include xsDown {
    padding: 8px 16px;
  }
}
.section-card {
  max-width: 80%;
  margin: auto;
  padding: 24px;
  text-align: left;
  margin-bottom: 24px;
  border-radius: 8px;

  @include xsDown {
    max-width: 100%;
  }
}

.about__text-fields {
  margin-top: 24px;
  margin-left: 24px;
  width: 100%;
}

.about__container {
  display: flex;

  @include xsDown {
    flex-direction: column;
    align-items: center;
  }
}

.section-title {
  margin-bottom: 16px;
}

.action-button {
  width: 100%;
  text-align: right;

  .update-btn {
    border-radius: 20px;
  }
}
</style>
