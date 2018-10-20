<template>
  <div class="main-background">
    <v-container>
    <div class="landing-page--text">Onboarding made easier</div>
    <div class="landing-page__sub-heading">Find your buddy before you arrive</div>
    <v-btn class="find-buddy__button" to="/find-companion" large color="primary">Find a buddy NOW</v-btn>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/settings.scss";
@import "../styles/_breakpoints.scss";

.landing-page--text {
  // padding-top: 48px;
  font-size: 72px;
  font-weight: 700;
  color: $purple-taupe;

  @include xsDown {
    padding: 16px;
    font-size: 48px;
  }
}

.landing-page__sub-heading {
  font-size: 32px;
  font-weight: 400;
  color: $purple-taupe;

  @include xsDown {
    padding: 16px;
    font-size: 32px;
  }
}

.find-buddy__button {
  margin-top: 16px;
  height: 80px;
  width: 400px;
  border-radius: 50px !important;

  & /deep/ .v-btn__content {
    font-size: 32px;

    @include xsDown {
      font-size: 18px;
    }
  }

  @include xsDown {
    height: 44px;
    width: unset;
    margin-bottom: 48px;
  }
}

.main-background {
  background-image: url("../assets/images/bg-image.png") !important;
  // background-position: center center !important;
  background-size: cover !important;
  height: 100%;
}
</style>

<script>
// @ is an alias to /src
import FindYourCompanion from "@/components/FindYourCompanion";

export default {
  name: "home",
  components: {
    FindYourCompanion
  }
};
</script>
