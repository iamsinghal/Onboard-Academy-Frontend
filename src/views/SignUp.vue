<template>
  <div class="bg--color">
    <v-container>
      <v-card>
        <h1 class="title--color">Sign Up</h1>
        <v-form>
          <v-text-field
            v-validate="'required'"
            :error-messages="errors.collect('name')"
            v-model="user.name"
            name="name"
            label="Name"
            height="50"
            id="name"
          />
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
            v-validate="'required|min:8'"
            :error-messages="errors.collect('password')"
            v-model="user.password"
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
            @click="signUp"  
          >
          Get Started
          </v-btn>
          <!-- OR -->
          <!-- <v-btn dark color="#559AD1" round>Sign up with Facebook</v-btn> -->
          <!-- <v-btn dark color="#E8473C" round>Sign up with Google</v-btn> -->
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { API_URLS } from "../utilities/constants";

export default {
  name: "SignUp",
  data: () => ({
    user: {}
  }),
  methods: {
    signUp() {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          return;
        }

        // axios.defaults.headers = {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*"
        // };

        axios
          .post(API_URLS.REGISTER, this.user)
          .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            this.$store.commit("setViewer", {
              email: this.user.email,
              name: this.user.name
            });
            this.$router.push("/");
          })
          .catch(e => {
            console.log(e);
            console.log(this.user);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/settings";
@import "../styles/_breakpoints.scss";

.bg--color {
  background-color: $floral-white;
  height: 100%;
}

.v-card {
  margin: auto;
  max-width: calc(100% / 2);
  padding: 24px;
  border-radius: 8px;

  @include xsDown {
    max-width: 100%;
  }
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

  @include mdDown {
    max-width: 150px;
    width: 100%;
  }
}

.title--color {
  color: $dark-puce;
}
</style>
