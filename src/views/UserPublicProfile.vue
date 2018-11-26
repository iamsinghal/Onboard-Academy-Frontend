<template>
   <div class="main-container">
    <v-card class="section-card">
      <h2 class="section-title">About</h2>
      <div class="about__container">
        <img :src="profile.picture" alt="Profile Picture">
        
        <!-- About Section -->
        <div class="about__text-fields">
          <div>Name :{{profile.user.name}}</div>

          <div>Email : {{profile.user.email}}</div>
          
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
      <div> Phone: {{profile.contact.mobile}}</div>
      <div> Email: {{profile.user.email}}</div>
      <div> Facebook: {{profile.contact.fbUrl}}</div>
      <div> Location: {{profile.origin}}</div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";
import defaultAvatar from "../assets/images/avatarImage.jpeg";

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
        console.log(res.data);
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
.main-container {
  padding: 24px 48px;
  text-align: center;
  margin-bottom: 100px;
}
.section-card {
  max-width: 80%;
  margin: auto;
  padding: 24px;
  text-align: left;
  margin-bottom: 24px;
  border-radius: 8px;
}

.about__text-fields {
  margin-left: 24px;
  width: 100%;
}

.about__container {
  display: flex;
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
