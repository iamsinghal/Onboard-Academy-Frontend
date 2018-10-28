<template>
  <div>
    <v-card class="stepper-container">
      <v-stepper v-model="e1">
      <v-stepper-header :class="stepperHide">
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
        Name of step 1
      </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
        Name of step 2
      </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="3"
        >
        Name of step 3
      </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        
        <!-- Step - 1 -->
        <v-stepper-content step="1">
          <v-card
            flat
            class="mb-5 elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back">
            <v-icon disabled size="48"></v-icon>
          </span>
          <div>
            <span class="card__title">Which College you are going to study in Canada?</span>
              <v-select
                :items="institutionList"
                class="input--wide"
                v-model="institutionSelected"
                label="Choose College/University"
                :menu-props="{offsetY: '', nudgeTop: '-8'}"
              />
          </div>
          <span class="action--forward">
            <v-icon size="48" @click="e1 = 2">chevron_right</v-icon>
          </span>
          </v-card>
        </v-stepper-content>

        <!-- Step - 2 -->
        <v-stepper-content step="2">
          <v-card
            class="mb-5 elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back">
            <v-icon size="48" @click="e1 = 1">chevron_left</v-icon>
          </span>
          <div>
            <span class="card__title">Which program you are going for?</span>
              <v-select
                :items="programList"
                class="input--wide"
                v-model="programSelected"
                label="Select your program"
                :menu-props="{offsetY: '', nudgeTop: '-8'}"
              />
          </div>
          <span class="action--forward">
            <v-icon size="48" @click="e1 = 3">chevron_right</v-icon>
          </span>
          </v-card>
        </v-stepper-content>

        <!-- Step - 3 -->
        <v-stepper-content step="3">
          <v-card
            class="mb-5 elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back">
            <v-icon size="48" @click="e1 = 2">chevron_left</v-icon>
          </span>
          <div>
            <span class="card__title">When is your program starting?</span>
              <v-select
                :items="sessionList"
                class="input--wide"
                v-model="sessionSelected"
                label="Select Intake"
                :menu-props="{offsetY: '', nudgeTop: '-8'}"
              />
          </div>
          <span class="action--forward">
            <v-icon size="48" @click="e1 = 4">chevron_right</v-icon>
          </span>
          </v-card>
        </v-stepper-content>

        <!-- Step - 4 -->
        <v-stepper-content step="4">
          <v-card
            class="elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back">
            <v-icon size="48" @click="e1 = 3">chevron_left</v-icon>
          </span>
          <div>
            <span class="card__title">Where are you coming from?</span>
              <v-select
                :items="locationList"
                class="input--wide"
                v-model="locationSelected"
                label="Select Origin"
                :menu-props="{offsetY: '', nudgeTop: '-8'}"
              />
          </div>
          <span class="action--forward">
            <v-icon disabled size="48" @click="e1 = 1"/>
          </span>
          </v-card>
          <v-btn color="success" @click="findMatches()" class="find-matches-btn">Find Matches NOW</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/settings.scss";

.card__title {
  display: block;
  font-size: 40px;
  margin: auto;
  padding: 10px;
  margin-bottom: 100px;
  color: $purple-taupe;
}

.stepper--hide {
  display: none;
}

.search__card {
  border: 1px solid #c5c5c5 !important;
  border-radius: 8px;
}

.input--wide {
  max-width: 400px;
  margin: auto;
}

.input__container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.action--back {
  display: block;
}

.action--forward {
  display: block;
}

.stepper-container {
  margin-top: 8px;
}

.find-matches-btn {
  margin-top: 16px;
  height: 60px;
  width: 300px;
  border-radius: 50px !important;

  & /deep/ .v-btn__content {
    font-size: 24px;
  }
}
</style>


<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";

export default {
  data: () => ({
    e1: 0,
    institutionList: [],
    institutionSelected: "",
    programList: ["Mobile Solutions Development", "Computer Applications Development", "Computer Applications Security"],
    programSelected:"",
    sessionList: ["Sep 2017", "May 2018", "Sep 2018", "Jan 2019"],
    sessionSelected: "",
    locationList: [],
    locationSelected: "",
  }),
  computed: {
    stepperHide() {
      return "stepper--hide";
    }
  },
  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.GET_INSTITUTION)
      .then(res => {
        const ins =  res.data.institutions;

        this.institutionList = ins.map(i => {
          return {text: `${i.name}, ${i.location.city}, ${i.location.province}`, value:i._id}
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
          return {text: `${loc.city}, ${loc.province}, ${loc.country}`, value: loc._id}
        });
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  },
  methods: {
    findMatches(){
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      const postBody = {
        session: this.sessionSelected,
        program: this.programSelected,
        origin: this.locationSelected,
        institution: this.institutionSelected
      };

      axios
        .post(API_URLS.UPDATE_PROFILE, postBody)
        .then(res => {
          console.log(res);
          this.$router.push("/view-matches")
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
