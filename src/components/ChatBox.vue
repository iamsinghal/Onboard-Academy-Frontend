<template>
  <div class="message__block">
      <v-card dark class="chat-members">
        Conversation with: {{members}}
      </v-card>
      <div class="conversations__block" >
        <template v-for="(chat, index) in conversations">

        <v-card :key="index" class="chat__card" v-if="!isLoggedInUser(chat.id)">
          <v-avatar
            size="50"
            color="primary"
          >
            <span class="white--text headline">{{avatar(chat.user)}}</span>
          </v-avatar>
          <div class="chat--message">
            <span>{{chat.message}}</span>
            <span v-if="chat.file">{{chat.file}}</span>
            <v-btn icon v-if="chat.file" @click="downloadFile(chat.file)">
              <v-icon>attach_file</v-icon>
            </v-btn>
          </div>
        </v-card>
        <v-card v-else class="user__chat__card"  :key="index">
          <div class="chat--message">
            <span>{{chat.message}}</span>
            <span v-if="chat.file">{{chat.file}}</span>
            <v-btn icon v-if="chat.file" @click="downloadFile(chat.file)">
              <v-icon>attach_file</v-icon>
            </v-btn>
          </div>
          <v-avatar
            size="50"
            color="primary"
          >
            <span class="white--text headline">{{avatar(chat.user)}}</span>
          </v-avatar>
        </v-card>
        </template>
      </div>
        <v-card class="chat__toolbar">
          <v-text-field
            class="chat__input"
            name="text-message"
            label="Message"
            id="text-message"
            v-model="textMessage"
          />
          <v-btn round color="primary" @click="sendMessage(textMessage)">Send</v-btn>
            <v-btn icon @click="fileAttachDialog = true"> <v-icon>attach_file</v-icon></v-btn>
        </v-card>

        <!-- File attach dialog -->
        <v-dialog
          v-model="fileAttachDialog"
          max-width="500px"
          transition="dialog-transition"
        >
        <v-card>
          <v-card-title>Attach File</v-card-title>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            <v-btn @click="submitFile()" round color="success">Upload</v-btn>
        </v-card>
    </v-dialog>
    </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";

export default {
  name: "ChatBox",
  data: () => ({
    conversations: [],
    textMessage: "",
    fileAttachDialog: false,
    file: ""
  }),
  props: {
    memberList: {
      default: "",
      type: String,
      required: true
    },
    chatGroupId: {
      default: "",
      type: String,
      required: true
    }
  },
  computed: {
    members() {
      if (!this.memberList) return "";
      return this.memberList;
    }
  },
  methods: {
    sendMessage(newMsg) {
      this.conversations = [
        ...this.conversations,
        {
          user: this.$store.state.viewer.name,
          message: newMsg,
          id: this.$store.state.viewer.id
        }
      ];
      this.sendMessageApi(newMsg);
      this.textMessage = "";
    },
    sendMessageApi(message) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .post(`${API_URLS.CHAT}/${this.chatGroupId}/message`, {
          message: message
        })
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
    isLoggedInUser(userId) {
      if (userId === this.$store.state.viewer.id) return true;
      return false;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      this.fileAttachDialog = false;

      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };
      axios
        .post(`${API_URLS.CHAT}/${this.chatGroupId}/file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    getAllChatsForAGroup(groupId) {
      this.conversations = [];
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .get(`${API_URLS.CHAT}/${groupId}/message`)
        .then(res => {
          if (!res.data) {
            return;
          }
          console.log(res.data);
          res.data.chatMessages.forEach(chat => {
            if (!chat.file) {
              this.conversations.push({
                user: chat.sender.name,
                message: chat.message,
                id: chat.sender._id
              });
            } else {
              this.conversations.push({
                user: chat.sender.name,
                message: chat.message,
                id: chat.sender._id,
                file: chat.file
              });
            }
          });
        })
        .catch(err => {
          if (err.response) {
            console.log(err);
          }
        });
    },
    avatar(name) {
      return name.substring(0, 1);
    },
    downloadFile(filename) {
      console.log(filename);

      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };

      axios
        .get(`${API_URLS.GET_FILE}/${filename}`)
        .then(res => {
          if (!res.data) {
            return;
          }
          window.open(res.data, "_blank");
        })
        .catch(err => {
          if (err.response) {
            console.log(err);
          }
        });
    }
  },
  watch: {
    chatGroupId(groupId) {
      this.getAllChatsForAGroup(groupId);
    }
  }
};
</script>

<style lang="scss" scoped>
.message__block {
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  padding: 16px;
  width: 100%;

  .conversations__block {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 350px;
    &::-webkit-scrollbar-track {
      box-shadow: 0px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 12px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: 0px;
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: whitesmoke;
    }
  }
}
.chat-members {
  max-height: 65px;
  height: 100%;
  padding-top: 20px;
  padding-left: 16px;
  margin: -16px -16px 16px -16px;
  // background-color: $purple-taupe;
}

.chat__card {
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  margin: 4px 0;
  max-width: 400px;

  & /deep/ .v-avatar {
    border-radius: 50% !important;
  }
}

.user__chat__card {
  padding: 8px;
  display: flex;
  align-items: center;
  margin: 4px 0;
  border-radius: 16px;
  max-width: 400px;
  margin-left: auto;
  justify-content: flex-end;

  & /deep/ .v-avatar {
    border-radius: 50% !important;
  }
}

.chat--message {
  margin: 8px;
}

.chat__toolbar {
  border-radius: 8px;
  margin-top: auto;
  padding: 4px 8px;
  display: flex;
  align-items: center;

  .chat__input {
    padding-left: 8px;
  }
}
</style>
