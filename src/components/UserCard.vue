<template>
  <div class="view-match__container">
      <v-card>
        <div class="card-detail">
          <v-btn v-if="removeBuddyBtn" @click="removeBuddy(matchedUser.id)" :disabled="isRemoveBuddy" class="remove-buddy" icon small color="white"> <v-icon>close</v-icon></v-btn>
          <div class="initials">
            {{initials(matchedUser.name)}}
          </div>
          <span>Name : {{matchedUser.name}}</span>
          <span>College : {{matchedUser.institution}}</span>
          <span>Location : {{matchedUser.origin}}</span>
          <div class="action-buttons">
            <v-btn v-if="connectBtn" :disabled="isInvited" @click="sendInvite(matchedUser.id)" class="connect-btn" round color="primary">Connect</v-btn>
            <div v-if="cancelInviteBtn">
              <v-btn class="connect-btn" disabled round color="secondary">Pending</v-btn>
              <v-btn class="connect-btn"  round color="secondary">Cancel Invite</v-btn>
            </div>
            <div v-if="acceptRejectBtn">
              <v-btn :disabled="isRejectedOrAccepted" @click="acceptRejectInvite(matchedUser.id, 'Approved')" round color="primary">Accept</v-btn>
              <v-btn :disabled="isRejectedOrAccepted" @click="acceptRejectInvite(matchedUser.id, 'Rejected')" round color="secondary">Reject</v-btn>
            </div>
            <v-btn v-if="messageBtn" round color="success">Message</v-btn>
          </div>
        </div>
      </v-card>
    </div>
</template>

<script>
export default {
  name: "UserCard",
  data: () => ({
    isInvited: false,
    isRejectedOrAccepted: false,
    isRemoveBuddy: false
  }),
  props: {
    matchedUser: {
      default: null,
      required: true,
      type: Object
    },
    connectBtn: {
      default: false,
      required: false,
      type: Boolean
    },
    acceptRejectBtn: {
      default: false,
      required: false,
      type: Boolean
    },
    cancelInviteBtn: {
      default: false,
      required: false,
      type: Boolean
    },
    messageBtn: {
      default: false,
      required: false,
      type: Boolean
    },
    removeBuddyBtn: {
      default: false,
      required: false,
      type: Boolean
    }
  },
  methods: {
    initials(name) {
      return name.substring(0, 1);
    },
    // Need to handle fail case
    sendInvite(buddyId) {
      this.$emit("send-invite", buddyId);
      this.isInvited = true;
    },
    acceptRejectInvite(buddyId, status) {
      console.log(status);
      this.$emit("acceptRejectInvite", { buddyId, status });
      this.isRejectedOrAccepted = true;
    },
    removeBuddy(buddyId) {
      console.log(buddyId);
      this.$emit("removeBuddy", { buddyId });
      this.isRemoveBuddy = true;
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

.card-detail {
  text-align: center;
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.initials {
  max-width: 100px;
  font-size: 60px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  margin-bottom: 8px;
  color: grey;
  border: 1px solid grey;
  border-radius: 8px;
}

.v-card {
  margin: 8px;
  border-radius: 8px;
  width: 100%;
}

.remove-buddy {
  display: block;
  margin-left: auto;
}
</style>
