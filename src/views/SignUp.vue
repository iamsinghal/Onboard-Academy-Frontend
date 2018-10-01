<template>
  <div class="bg--color">
    <v-container>
      <v-card>
        <h1 class="title--color">Sign Up</h1>
        <v-text-field
          name="name"
          label="Name"
          height="50"
          id="name"
        />
        <v-text-field
          name="email"
          label="Email"
          height="50"
          id="email"
        />
        <v-text-field
          type="password"
          name="password"
          label="Password"
          height="50"
          id="password"
        />
        <v-btn dark color="#433a3f" round>Get Started</v-btn>
        OR
        <v-btn dark color="#559AD1" round>Sign up with Facebook</v-btn>
        <v-btn dark color="#E8473C" round>Sign up with Google</v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SignUp"
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

.title--color {
  color: $dark-puce;
}
</style>
