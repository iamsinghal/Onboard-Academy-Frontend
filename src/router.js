import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SignUp from "./views/SignUp.vue";
import Login from "./views/Login.vue";
import FindCompanion from "./views/FindCompanionPage.vue";
import UserProfile from "./views/UserProfile.vue";
import ViewMatches from "./views/ViewMatches.vue";
import MyBuddies from "./views/MyBuddies.vue";
import MyMessages from "./views/MyMessages.vue";
import { isJwtValid } from "./utilities/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "sign-up",
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/find-companion",
      name: "find-companion",
      component: FindCompanion
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/view-matches",
      name: "view",
      component: ViewMatches,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/my-buddies",
      name: "my-buddies",
      component: MyBuddies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/messages",
      name: "my-messages",
      component: MyMessages,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenicated = isJwtValid();

  if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
    if (isAuthenicated) {
      return next();
    }
    return next("/login");
  }
  next();
});

export default router;
