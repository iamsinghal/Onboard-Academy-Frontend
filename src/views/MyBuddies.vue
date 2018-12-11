<template>
  <div class="main-container">
    <h2 class="section__title">Pending Invitations</h2>
    <div v-if="pendingInvitations.length" class="matched-results">
      <UserCard
      v-for="(user, index) in pendingInvitations" :key="index"
      :matchedUser="user"
      class="user__card"
      acceptRejectBtn
      @acceptRejectInvite="acceptRejectInvite($event)"
    />
    </div>
    <span v-else  class="empty-state" >You have no pending connection!</span>
    
    <h2 class="section__title"> Your Buddies</h2>
    <div class="matched-results">
      <UserCard
      v-for="(user, index) in buddyList" :key="index"
      :matchedUser="user"
      class="user__card"
      removeBuddyBtn
      messageBtn
      @removeBuddy="removeBuddy($event)"
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
    pendingInvitations: [],
    buddyList: []
  }),
  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.PENDING_INVITATION)
      .then(res => {
        if (!res.data) {
          return;
        }
        let pendingInvitations = [];
        res.data.buddyList.forEach(b => {
          pendingInvitations.push({
            name: b.buddyProfile.user.name,
            institution: b.buddyProfile.institution.name,
            origin: `${b.buddyProfile.origin.city},
            ${b.buddyProfile.origin.province}, 
            ${b.buddyProfile.origin.country} `,
            id: b._id
          });
        });
        this.pendingInvitations = pendingInvitations;
        console.log(pendingInvitations.length);
      })
      .catch(err => {
        if (err.response) {
          console.log(err);
        }
      });

    axios
      .get(API_URLS.BUDDY)
      .then(res => {
        if (!res.data) {
          return;
        }
        let buddyList = [];
        res.data.buddyList.forEach(b => {
          buddyList.push({
            name: b.buddyProfile.user.name,
            institution: b.buddyProfile.institution.name,
            origin: `${b.buddyProfile.origin.city},
            ${b.buddyProfile.origin.province}, 
            ${b.buddyProfile.origin.country} `,
            id: b._id
          });
        });
        this.buddyList = buddyList;
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
    acceptRejectInvite(statusAndBuddyId) {
      console.log(statusAndBuddyId);
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .patch(API_URLS.BUDDY, statusAndBuddyId)
        .then(res => {
          if (!res.data) {
            return;
          }
          console.log(res.data);
        })
        .catch(err => {
          if (err.response) {
            console.log(err);
          }
        });
    },
    removeBuddy(buddyId) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .delete(API_URLS.BUDDY, { data: buddyId })
        .then(res => {
          if (!res.data) {
            return;
          }
          console.log(res.data);
        })
        .catch(err => {
          if (err.response) {
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

  @include xsDown {
    padding: 8px 16px;
    flex-direction: column;
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

  & /deep/ .view-match__container.user__card {
    width: calc(100% / 3);
  }
  @include xsDown {
    & /deep/ .view-match__container.user__card {
      width: 100%;
    }
  }
}

.empty-state {
  margin: 24px 0 24px 8px;
  display: block;
}

.section__title {
  margin-left: 8px;
  margin-bottom: 8px;
}
</style>
