<template>
  <v-overlay
    :absolute="false"
    value="true"
    @click="
      $emit('hideOverlay');
      isLoading = false;
    "
  >
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="isLoading"
    ></v-progress-circular>
    <v-card v-else>
      <v-list-item-title class="text-h2" v-if="!hasPlans" style="padding: 20px">
        No plans for this product
      </v-list-item-title>
      <v-row no-gutters v-for="plan in plans" :key="plan.id">
        <v-col v-for="(value, key, index) in plan" :key="index">
          <v-card class="pa-2 planData" outlined tile height="150px">
            <v-card-title>{{ key }}:</v-card-title>
            <v-card-subtitle>{{ value }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-overlay>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: String,
  },

  data() {
    return {
      isLoading: false,
      hasPlans: true,
      plans: [],
    };
  },
  created() {
    this.isLoading = true;
    axios
      .get(`/products/${this.id}/plans`)
      .then((res) => {
        this.isLoading = false;
        if (res.data == "") {
          setTimeout(() => {
            this.isLoading = false;
            this.$emit("hideOverlay");
          }, 800);
          this.hasPlans = false;
          return;
        }
        this.plans = res.data;
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style scoped>
.planData {
  overflow: hidden;
}
.planData:hover {
  overflow: auto;
}
</style>
