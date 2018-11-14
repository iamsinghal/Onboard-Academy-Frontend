<template>
  <div class="main-container">
    <div class="message__list">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-btn icon class="new-message__btn" @click="dialog = true">
            <v-icon>message</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line class="list__scrollbar">
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </div>

    <!-- Chat Box -->
    <div class="message__block">
      <v-card dark class="chat-members">
        Conversation with: Vaibhav, Archit, Vishal
      </v-card>
      <div class="conversations__block" >
        <template v-for="(chat, index) in conversations">

        <v-card  :key="index" class="chat__card" v-if="chat.user === 'vishal'">
          <v-avatar
            size="50"
            color="primary"
          >
            <span class="white--text headline">RS</span>
          </v-avatar>
          <div class="chat--message">
            <span>{{chat.message}}</span>
          </div>
        </v-card>
        <v-card v-else class="user__chat__card"  :key="index">
          <div class="chat--message">
            <span>{{chat.message}}</span>
          </div>
          <v-avatar
            size="50"
            color="primary"
          >
            <span class="white--text headline">RS</span>
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
    </div>

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
          :disabled="isUpdating"
          :items="buddiesList"
          box
          chips
          color="blue-grey lighten-2"
          label="Select"
          multiple
        >
          <template
            slot="selection"
            slot-scope="data"
          >
            <v-chip
              :selected="data.selected"
              close
              class="chip--select-multi"
              @input="remove(data.item)"
            >
              {{ data.item }}
            </v-chip>
          </template>
            <template
            slot="item"
            slot-scope="data">
              <v-list-tile-content v-text="data.item"></v-list-tile-content>
            </template>
        </v-autocomplete>
        <v-btn round color="secondary">Start Chat</v-btn>
      </v-card>
    </v-dialog>

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
export default {
  name: "MyMessages",
  data: function() {
    return {
      file: "",
      textMessage: "",
      selectedBuddiesForChat: [],
      isUpdating: false,
      dialog: false,
      fileAttachDialog: false,
      buddiesList: ["Archit", "Vishal", "Vaibhav", "Jeevan"],
      title: "My Messages",
      conversations: [
        {
          user: "vishal",
          message: "Hello, How are you?"
        },
        {
          user: "vishal",
          message: "Where are you?"
        },
        {
          user: "rohit",
          message: "What's up?"
        }
      ],
      items: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    };
  },
  methods: {
    findDetails() {
      console.log("Find details");
    },
    sendMessage(msg) {
      this.conversations = [
        ...this.conversations,
        { user: "vishal", message: msg }
      ];
      console.log("message", msg);
    },
    remove(item) {
      console.log(item);
      const index = this.selectedBuddiesForChat.indexOf(item);
      if (index >= 0) this.selectedBuddiesForChat.splice(index, 1);
      console.log(this.selectedBuddiesForChat);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(this.file);
      this.fileAttachDialog = false;

      // axios
      //   .post("/single-file", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   })
      //   .then(function() {
      //     console.log("SUCCESS!!");
      //   })
      //   .catch(function() {
      //     console.log("FAILURE!!");
      //   });
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

.main-container {
  text-align: left;
  padding: 48px;
  display: flex;
}

.message__list {
  max-width: calc(100% / 2);
  width: 100%;
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

.message__block {
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  padding: 16px;
  max-width: calc(100% / 2);
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

  .chat-members {
    max-height: 65px;
    height: 100%;
    padding-top: 20px;
    padding-left: 16px;
    margin: -16px -16px 16px -16px;
    background-color: $purple-taupe;
  }
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

.new-message__btn {
  margin-left: auto !important;
}

.new-message__modal {
  padding: 16px;
}
</style>
