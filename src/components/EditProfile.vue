<template>
  <div class="main-container">
    <v-card class="section-card">
      <h2 class="section-title">About</h2>
      <div class="about__container">
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Profile Picture">
        
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
        v-model="profile.institution.name"
        label="College"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
      <v-select
        :items="intakeList"
        v-model="profile.programSession"
        label="Intake"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
    </v-card>

    <!-- Contact Information -->
    <v-card class="section-card">
      <h2 class="section-title">Contact</h2>
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
      <v-select
        :items="originList"
        v-model="homeAdress"
        label="Home Address"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
      <div class="action-button">
        <v-btn class="update-btn" color="success" @click="updateProfile()">Update</v-btn>
      </div>
    </v-card>
  </div>

</template>

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


<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";

export default {
  name: "EditProfile",
  data: () => ({
    value: "",
    items: ["Something", "Anything"],
    institutionList: ["Conestoga College", "Waterloo University"],
    intakeList: ["Sep 2018", "May 2018", "Sep 2017"],
    originList: ["New Delhi, New Delhi, India", "Pune, Maharasthra, India"],
    homeAdress: "",
    profile: {
      user: {
        name: "",
        email: ""
      },
      origin: {
        city: "",
        country: "",
        province: ""
      },
      contact: {
        mobile: "",
        fbUrl: ""
      },
      institution: {
        name: "",
        location: {
          city: "",
          country: "",
          province: ""
        }
      },
      programSession: ""
    }
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
        const { mobile, facebookUrl } = res.data;
        const { city, province, country } = res.data.origin;

        this.profile.user = res.data.user;
        this.profile.institution = res.data.institution;
        this.profile.programSession = res.data.session;
        this.profile.contact.mobile = mobile;
        this.profile.contact.fbUrl = facebookUrl;
        this.homeAdress = `${city}, ${province}, ${country}`;
      })
      .catch(err => {
        if (err.response.data.message) {
          console.log(err);
        }
      });
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
        session: this.profile.programSession
      };

      axios
        .post(API_URLS.UPDATE_PROFILE, postBody)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
