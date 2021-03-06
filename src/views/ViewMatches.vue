<template>
  <div class="main-container">
    <h2 class="section__title">Matched Results</h2>
    <div class="matched-results">
      <UserCard
      v-for="(user, index) in matchResult" :key="index"
      :matchedUser="user"
      connectBtn
      class="user__card"
      v-on:send-invite="sendInvite($event)"
    />
    </div>

    <h2 class="section__title">Sent Invitation</h2>
    <div class="matched-results">
      <UserCard
      v-for="(user, index) in invitedBuddies" :key="index"
      :matchedUser="user"
      class="user__card"
      cancelInviteBtn
    />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "@utilities/constants";
import UserCard from "@components/UserCard.vue";

export default {
  name: "ViewMatches",
  components: {
    UserCard
  },
  data: () => ({
    matchResult: [],
    invitedBuddies: []
  }),
  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.VIEW_MATCHES)
      .then(res => {
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

    axios
      .get(API_URLS.SENT_INVITATIONS)
      .then(res => {
        if (!res.data) {
          return;
        }

        let invitedBuddies = [];
        res.data.buddyList.forEach(b => {
          invitedBuddies.push({
            name: b.buddyProfile.user.name,
            institution: b.buddyProfile.institution.name,
            origin: `${b.buddyProfile.origin.city},
            ${b.buddyProfile.origin.province}, 
            ${b.buddyProfile.origin.country} `,
            buddyId: b._id,
            id: b.buddyProfile.user._id
          });
        });
        this.invitedBuddies = invitedBuddies;
      })
      .catch(err => {
        if (err.response) {
          console.log(err);
        }
      });
  },

  methods: {
    initials(name) {
      return name.substring(0, 1);
    },
    sendInvite(buddyId) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .post(API_URLS.BUDDY, { addedUser: buddyId })
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
@import "@styles/_breakpoints.scss";

.view-match__container {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  max-width: calc(100% / 3);
  width: 100%;

  @include mdDown {
    max-width: calc(100% / 2);
  }
  @include xsDown {
    max-width: 100%;
  }

  @include xlUp {
    max-width: calc(100% / 4);
  }
}

.section__title {
  margin-left: 8px;
  margin-bottom: 8px;
}

.main-container {
  text-align: left;
  padding: 24px 48px;

  @include xsDown {
    padding: 8px 16px;
  }
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

.matched-results {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 48px;

  & /deep/ .v-card {
    border-radius: 8px;
    width: 100%;
  }
}
</style>
