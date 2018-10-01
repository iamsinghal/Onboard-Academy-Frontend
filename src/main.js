import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";

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
    warning: "#FFC107"
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
