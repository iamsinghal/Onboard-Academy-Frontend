<template>
  <div class="main-container">
    <h2>View Matches</h2>
    <div class="view-match__container">
      <v-card v-for="(u, index) in matchResult" :key="index">
        <div class="card-detail">
          <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Profile Picture"> -->
          <div class="initials">
            {{initials(u.name)}}
          </div>
          <span>Name : {{u.name}}</span>
          <span>College : {{u.institution}}</span>
          <span>Location : {{u.origin}}</span>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";

export default {
  name: "ViewMatches",
  data: () => ({
    matchResult: []
  }),
  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.VIEW_MATCHES)
      .then(res => {
        console.log(res.data);
        if (!res.data) {
          return;
        }
        this.matchResult = res.data;
      })
      .catch(err => {
        if (err.response.data.message) {
          console.log(err);
        }
      });
  },

  methods: {
    initials(name) {
      return name.substring(0, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.view-match__container {
  display: flex;
  flex-wrap: wrap;
  height: auto;
}

.v-card {
  margin: 8px;
  border-radius: 8px;
  max-width: 200px;
  width: 100%;
}

.main-container {
  text-align: left;
  padding: 48px;
}

.card-detail {
  padding: 16px;
  width: 100%;

  img {
    margin: auto;
    display: block;
    margin-bottom: 16px;
  }
  span {
    font-size: 14px;
    display: block;
  }
}

.v-card {
  max-width: 100%;
  width: fit-content;
}

.initials {
  max-width: 200px;
  font-size: 100px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  margin-bottom: 8px;
  color: grey;
  border: 1px solid grey;
  border-radius: 8px;
}
</style>
