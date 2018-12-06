<template>
  <div class="main-container">
    <v-card class="section-card">
      <h2 class="section-title">About</h2>
      <div class="about__container">
        <img :src="avatarImageUrl" alt="Profile Picture">
        
        <!-- About Section -->
        <div class="about__text-fields">
          <v-text-field
          v-model="profile.user.name"
          name="name"
          label="Name"
          id="name"
          />
          <v-text-field
            disabled
            v-model="profile.user.email"
            name="email"
            label="Email"
            id="email"
          />
        </div>
      </div>
    </v-card>
    
    <!-- Education Section -->
    <v-card class="section-card">
      <h2 class="section-title">Education</h2>
      <v-select
        :items="institutionList"
        v-model="profile.institution.id"
        label="College"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
      <v-select
        :items="programList"
        v-model="profile.program"
        label="Program"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
      <v-select
        :items="sessionList"
        v-model="profile.programSession"
        label="Session"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
    </v-card>

    <!-- Contact Information -->
    <v-card class="section-card">
      <h2 class="section-title">Contact</h2>
      <v-autocomplete
        :loading="loading"
        :items="locationList"
        :search-input.sync="search"
        v-model="profile.origin.id"
        cache-items
        flat
        
        label="Home Address"
      />
      <v-text-field
        v-model="profile.contact.mobile"
        name="phone"
        label="Phone"
        id="phone"
      />
      <v-text-field
        v-model="profile.user.email"
        disabled
        name="email"
        label="Email"
        id="email"
      />
      <v-text-field
        name="linkedin"
        label="Linkedin"
        id="linkedin"
      />
      <v-text-field
        v-model="profile.contact.fbUrl"
        name="facebook"
        label="Facebook"
        id="facebook"
      />
      <div class="action-button">
        <v-btn class="update-btn" color="success" @click="updateProfile()">Update</v-btn>
      </div>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      bottom
      left
      :timeout="timeout"
    >
      {{ toastMessage }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>

</template>

<style lang="scss" scoped>
@import "../styles/_breakpoints.scss";

.main-container {
  padding: 24px 48px;
  text-align: center;
  // margin-bottom: 24px;

  @include xsDown {
    padding: 8px 16px;
  }
}
.section-card {
  max-width: 80%;
  margin: 16px auto;
  padding: 24px;
  text-align: left;
  margin-bottom: 24px;
  border-radius: 8px;

  @include xsDown {
    max-width: 100%;
  }
}

.about__text-fields {
  margin-left: 24px;
  width: 100%;

  @include xsDown {
    margin: 24px 0 0 0;
  }
}

.about__container {
  display: flex;

  @include xsDown {
    align-items: center;
    flex-direction: column;
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


<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";
import defaultAvatar from "../assets/images/avatarImage.jpeg";

export default {
  name: "EditProfile",
  data: () => ({
    value: "",
    institutionList: [],
    programList: [
      "Mobile Solutions Development",
      "Computer Applications Development",
      "Computer Applications Security"
    ],
    sessionList: ["Sep 2017", "May 2018", "Sep 2018", "Jan 2019"],
    locationList: [],
    profile: {
      user: {
        name: "",
        email: ""
      },
      origin: {
        id: ""
      },
      contact: {
        mobile: "",
        fbUrl: ""
      },
      institution: {
        id: ""
      },
      programSession: "",
      program: ""
    },
    defaultAvatar,
    toastMessage: "",
    snackbar: false,
    timeout: 4000
  }),
  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.USER_PROFILE)
      .then(res => {
        console.log(res.data);
        if (!res.data) {
          return;
        }
        const {
          mobile,
          facebookUrl,
          program,
          user,
          session,
          institution,
          origin
        } = res.data;
        this.profile.user = user;
        this.profile.institution.id = institution ? institution._id : "";
        this.profile.programSession = session;
        this.profile.contact.mobile = mobile;
        this.profile.contact.fbUrl = facebookUrl;
        this.profile.origin.id = origin ? origin._id : "";
        this.profile.program = program;
      })
      .catch(err => {
        if (err.response.data.message) {
          console.log(err);
        }
      });

    axios
      .get(API_URLS.GET_INSTITUTION)
      .then(res => {
        const ins = res.data.institutions;

        this.institutionList = ins.map(i => {
          return {
            text: `${i.name}, ${i.location.city}, ${i.location.province}`,
            value: i._id
          };
        });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });

    axios
      .get(API_URLS.GET_LOCATION)
      .then(res => {
        const locations = res.data.locations;
        this.locationList = locations.map(loc => {
          return {
            text: `${loc.city}, ${loc.province}, ${loc.country}`,
            value: loc._id
          };
        });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  },
  computed: {
    avatarImageUrl() {
      if (!this.$store.state.viewer.picUrl) return defaultAvatar;
      return this.$store.state.viewer.picUrl;
    }
  },
  methods: {
    updateProfile() {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      const postBody = {
        mobile: this.profile.contact.mobile,
        facebookUrl: this.profile.contact.fbUrl,
        session: this.profile.programSession,
        program: this.profile.program,
        origin: this.profile.origin.id,
        institution: this.profile.institution.id
      };

      axios
        .post(API_URLS.UPDATE_PROFILE, postBody)
        .then(res => {
          console.log(res);
          this.toastMessage = "Profile updated successfully!";
          this.snackbar = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
