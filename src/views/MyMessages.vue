<template>
  <div class="main-container">
    
    <!-- List of Chats - Left panel of message box -->
    <div class="message__list">
      <v-card class="message__list__card">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-btn icon class="new-message__btn" @click="dialog = true">
            <v-icon>message</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line class="list__scrollbar">
          <template v-for="(item, index) in chatList">
            <v-divider
              v-if="item.divider"
              :key="index"
            ></v-divider>
 
            <v-list-tile
              v-else
              :key="index"
              avatar
              @click="viewChat(item)"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.members"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.message"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </div>

    <!-- Chat Box -->
    <ChatBox class="chat-box"
      :memberList="groupMemberList"
      :chatGroupId="chatGroupId"    
    />

    <!-- New Message Modal -->
    <v-dialog
      v-model="dialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="new-message__modal">
        <v-card-title primary-title>
          Add Buddies
        </v-card-title>
        <v-autocomplete
          v-model="selectedBuddiesForChat"
          :items="buddiesList"
          box
          chips
          color="blue-grey lighten-2"
          label="Select"
          return-object
          item-text="text"
          item-value="value"
          multiple
        >
           <!-- Display in menu list -->
          <template
          slot="item"
          slot-scope="data">
            <v-list-tile-content v-text="data.item.text"></v-list-tile-content>
          </template>
        <!-- Display selected value  from list -->
          <template
            slot="selection"
            slot-scope="data"
          >
            <v-chip
              :selected="data.selected"
              close
              class="chip--select-multi"
              @input="remove(data.item.value)"
            >
              {{ data.item.text }}
            </v-chip>
          </template>
        </v-autocomplete>
        <v-btn round color="secondary" @click="startChat()" >Start Chat</v-btn>
      </v-card>
    </v-dialog>

  
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";
import ChatBox from "../components/ChatBox.vue";

export default {
  name: "MyMessages",
  components: {
    ChatBox
  },
  data: function() {
    return {
      chatGroupId: "",
      selectedBuddiesForChat: [],
      isUpdating: false,
      dialog: false,
      buddiesList: ["Archit", "Vishal", "Vaibhav", "Jeevan"],
      groupMemberList: "",
      title: "My Messages",

      chatList: [
        {
          members: "Archit, Vishal, Vaibhav",
          message: "Last message",
          groupId: ""
        },
        { divider: true, inset: true }
      ]
    };
  },
  mounted() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    };

    axios
      .get(API_URLS.BUDDY)
      .then(res => {
        if (!res.data) {
          return;
        }
        let buddyList = [];
        res.data.buddyList.forEach(b => {
          buddyList.push({
            text: b.buddyProfile.user.name,
            value: b.buddyProfile.user._id
          });
        });
        this.buddiesList = buddyList;
      })
      .catch(err => {
        if (err.response) {
          console.log(err);
        }
      });

    // Fetch all chat groups
    axios
      .get(API_URLS.CHAT)
      .then(res => {
        if (!res.data) {
          return;
        }
        const groupChatIds = Object.keys(res.data.chatGroups);
        groupChatIds.forEach(groupId => {
          let membersName = [];
          res.data.chatGroups[groupId].forEach(m => {
            membersName.push(m.member.name);
          });
          this.chatList = [
            {
              members: membersName.join(", "),
              groupId: groupId,
              message: "Click to start"
            },
            { divider: true, inset: true },
            ...this.chatList
          ];
        });
      })
      .catch(err => {
        if (err.response) {
          console.log(err);
        }
      });
  },
  methods: {
    findDetails() {
      console.log("Find details");
    },

    remove(item) {
      this.selectedBuddiesForChat = this.selectedBuddiesForChat.filter(
        i => i.value !== item
      );
    },

    startChat() {
      // Hide create new chat dialouge
      this.dialog = false;
      // Call create chat api
      this.createNewChat();
    },
    viewChat(chat) {
      // Show chat in chat box on clicking on tile

      // Pass groupId as prop in chatBox for selected chat.
      this.chatGroupId = chat.groupId;
      if (typeof chat === "object") {
        this.groupMemberList = chat.members;
      } else this.groupMemberList = "";
    },
    createNewChat() {
      // Get members Id for creating chat group
      const membersId = this.selectedBuddiesForChat.map(user => {
        return user.value;
      });

      //Get members name to display in chat box
      const membersName = this.selectedBuddiesForChat.map(user => {
        return user.text;
      });

      // Clears the selected buddies list after chat creation
      this.selectedBuddiesForChat = [];
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      };
      axios
        .post(API_URLS.CHAT, { memberIds: membersId })
        .then(res => {
          if (!res.data) {
            return;
          }
          // Get the group id for which chat is created
          const groupId = res.data.members[0].chatGroup._id;
          const newChat = {
            members: membersName.join(", "),
            groupId: groupId,
            message: "Click to send message"
          };
          this.viewChat(newChat);
          this.chatList = [
            newChat,
            { divider: true, inset: true },
            ...this.chatList
          ];
        })
        .catch(err => {
          if (err.response) {
            console.log(err);
          }
        });
    }
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings.scss";
@import "../styles/_breakpoints.scss";

.main-container {
  text-align: left;
  padding: 48px;
  display: flex;

  @include xsDown {
    padding: 8px 16px;
    flex-direction: column;
  }
}

.message__list {
  max-width: calc(100% / 2);
  width: 100%;

  @include xsDown {
    max-width: 100%;
    margin-bottom: 24px;
  }
  .message__list__card {
    height: 100%;

    @include xsDown {
      min-height: 300px;
      height: 100%;
    }
  }
}

.list__scrollbar {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 400px;

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

.new-message__btn {
  margin-left: auto !important;
}

.new-message__modal {
  padding: 16px;
}
.chat-box {
  max-width: 100%;
  min-height: 300px;

  width: 100%;

  @include xsDown {
    min-height: 300px;
    max-height: 500px;
  }
}
</style>
