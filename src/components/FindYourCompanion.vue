<template>
  <div>
     <v-stepper v-model="e1">
      <v-stepper-header :class="stepperHide">
        <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
            flat
            class="mb-5 elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back"><v-icon disabled size="48"></v-icon></span>
          <div>
            <span class="card__title">Find your companion</span>
              <v-select
                :items="items"
                class="input--wide"
                v-model="value"
                label="Choose College/University"
                offsetY
                nudgeTop="-8"
              />
          </div>
          <span class="action--forward"><v-icon size="48" @click="e1 = 2">chevron_right</v-icon></span>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card
            class="mb-5 elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back"><v-icon size="48" @click="e1 = 1">chevron_left</v-icon></span>
          <div>
            <span class="card__title">Choose Course</span>
              <v-select
                :items="items"
                class="input--wide"
                v-model="value"
                label="Choose College/University"
                offsetY
                nudgeTop="-8"
              />
          </div>
          <span class="action--forward"><v-icon size="48" @click="e1 = 3">chevron_right</v-icon></span>
          </v-card>
        </v-stepper-content>
  
        <v-stepper-content step="3">
          <v-card
            class="mb-5 elevation-0 input__container"
            color="white"
            height="400px"
          >
          <span class="action--back"><v-icon size="48" @click="e1 = 2">chevron_left</v-icon></span>
          <div>
            <span class="card__title">Choose Intake</span>
              <v-select
                :items="items"
                class="input--wide"
                v-model="value"
                label="Choose College/University"
                offsetY
                nudgeTop="-8"
              />
          </div>
          <span class="action--forward"><v-icon size="48" @click="e1 = 1">chevron_right</v-icon></span>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<style lang="stylus" scoped>

.card__title {
  font-size 40px
  margin auto;
  padding 10px;

}
.stepper--hide {
  display: none;
}

.search__card {
  border: 1px solid #C5C5C5 !important;
  border-radius: 8px;
}

.input--wide {
  max-width:400px;
  margin: auto;
}

.input__container {
  display: flex;
  align-items : center;
  justify-content : space-around;

}
.action--back {
  display: block;
}

.action--forward {
  display: block;
}
</style>


<script>
export default {
  data: () => ({
    e1: 0,
    items: [
      "Conestoga College, Kitchener, ON",
      "Lambton College, Toronto, ON",
      "Humber College, Toronto, ON"
    ],
    value: ""
  }),
  computed: {
    stepperHide() {
      return "stepper--hide";
    }
  }
};
</script>
