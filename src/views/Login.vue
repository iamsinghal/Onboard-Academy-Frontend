<template>
  <div class="bg--color">
    <v-container>
      <v-card>
        <h1 class="login--text">Log in</h1>
        <div>
          NEW TO ONBOARD CANADA?
          <router-link class="signup--link"  to="/signup">SIGN UP FOR FREE </router-link>
        </div>
        <v-form>
          <v-text-field
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
            v-model="user.email"
            name="email"
            label="Email"
            height="50"
            id="email"
          />
          <v-text-field
            v-model="user.password"
            v-validate="'required|min:8'"
            :error-messages="loginErrorMessage || errors.collect('password')"
            type="password"
            name="password"
            label="Password"
            height="50"
            id="password"
          />
          <v-btn
            dark
            color="#433a3f"
            round
            @click="login"
          >
          Log in
          </v-btn>
          OR
          <v-btn @click="socialLogin('facebook')" dark color="#559AD1" round>Log in with Facebook</v-btn>
          <!-- <v-btn @click="socialLogin('google')" dark color="#E8473C" round>Log in with Google</v-btn> -->
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";
import { decodeJwt } from "../utilities/auth";
import defaultAvatar from "../assets/images/avatarImage.jpeg";

export default {
  name: "Login",
  data: () => ({
    user: {},
    loginErrorMessage: "",
    defaultAvatar: defaultAvatar
  }),
  methods: {
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   Authorization: localStorage.getItem("token")
    // };

    login() {
      this.$validator.validateAll().then(isValid => {
        window.store = this.$store;
        if (!isValid) {
          return;
        }
        axios
          .post(API_URLS.LOGIN, this.user)
          .then(res => {
            this.saveToken(res.data);
          })
          .catch(err => {
            if (err.response.data.message) {
              this.loginErrorMessage = err.response.data.message;
            }
          });
      });
    },
    socialLogin(provider) {
      this.$auth
        .authenticate(provider)
        .then(res => {
          console.log(res.data);
          this.saveToken(res.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    saveToken(response) {
      let viewerObject = {};
      console.log(response);
      console.log(response.token);
      localStorage.setItem("token", response.token);
      if (response.profilePic) {
        viewerObject = {
          name: response.user.name,
          email: response.user.email,
          id: decodeJwt().id,
          picUrl: response.profilePic
        };
        this.$store.commit("setViewer", viewerObject);
      } else {
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

            if (!res.data.profilePic) {
              console.log("Profile Pic none");

              viewerObject = {
                name: response.user.name,
                email: response.user.email,
                id: decodeJwt().id,
                picUrl: this.defaultAvatar
              };
            } else {
              viewerObject = {
                name: response.user.name,
                email: response.user.email,
                id: decodeJwt().id,
                picUrl: res.data.profilePic
              };
            }

            this.$store.commit("setViewer", viewerObject);
          })
          .catch(err => {
            if (err) {
              console.log(err);
            }
          });
      }

      // TODO : Vue Authenticate uses axios and set extra auth token in localstorage and use it further
      // for axios header as Bearer token
      // Remove duplicate or use one token
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings";

.bg--color {
  background-color: $floral-white;
  height: 100%;
}

.v-card {
  margin: auto;
  max-width: calc(100% / 2);
  padding: 24px;
  border-radius: 8px;
}

.v-input {
  font-size: 24px;

  & /deep/ .v-label {
    font-size: 18px;
  }
}

.v-btn {
  margin: 32px auto;
  display: block;
  max-width: 200px;
  width: 100%;
  font-size: 10px;
  transform: scale(1.5);
}

.login--text {
  margin-bottom: 16px;
  color: $dark-puce;
}

.signup--link {
  text-decoration: none;
}
</style>
