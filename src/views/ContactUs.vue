<template>
  <div class="main-container">
    <v-card v-if="!isMessageSent" class="card--width">
      <h1>How can we help you?</h1>
      <v-select
        :items="categoryList"
        v-model="categorySelected"
        label="Category"
        :menu-props="{offsetY: '', nudgeTop: '-8'}"
      />
      <v-textarea
        name="message"
        box
        label="Message"
        auto-grow
        placeholder="Please type your message."
        v-model="feedbackMessage"
      />
      <v-btn round class="send__btn" @click="sendFeedback()" color="success">Send</v-btn>
    </v-card>
    <v-card v-if="isMessageSent" class="card--width">
      <h2>
        Your message has been sent successfully. <br>
        Thanks!
      </h2>
    </v-card>
  </div>  
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";

export default {
  name: "ContactUs",
  data: () => ({
    categoryList: ["Feedback", "Account", "Other"],
    categorySelected: "",
    isMessageSent: false,
    feedbackMessage: ""
  }),
  methods: {
    sendFeedback() {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .post(API_URLS.SEND_FEEDBACK, {
          type: this.categorySelected,
          text: this.feedbackMessage
        })
        .then(res => {
          if (!res.data) {
            return;
          }
          this.isMessageSent = true;
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
.main-container {
  padding: 24px 48px;
  text-align: center;
  margin-bottom: 100px;
}

.card--width {
  max-width: 50%;
  margin: 24px auto;
  padding: 24px;
}

.send__btn {
  display: block;
  margin-left: auto;
  margin-right: 0px !important;
}
</style>
