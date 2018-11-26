import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import createPersistedState from "vuex-persistedstate";
import VueAuthenticate from "vue-authenticate";
import VueAxios from "vue-axios";
import axios from "axios";
import { BASE_URL } from "./utilities/constants";

//css
import "vuetify/dist/vuetify.min.css";
import "@/styles/_override.scss";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary: "#F38B4C",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
    purpleTaupe: "#444054",
    cyanAzure: "#4f8bba",
    mandrin: "#f38b4c",
    darkPuce: "#433a3f",
    cornSilk: "#fcfad9",
    floralWhite: "#faf8f2"
  }
});
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: BASE_URL, // Your API domain

  providers: {
    facebook: {
      clientId: "611081999307305",
      url: `${BASE_URL}/auth/facebook`,
      redirectUri: BASE_URL // Your client app URL
    }
  }
});

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    viewer: null
  },
  mutations: {
    setViewer(state, payload) {
      state.viewer = payload;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
