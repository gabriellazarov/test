<template class="scroll">
  <div>
    <v-card class="mx-auto" max-width="544" outlined elevation="3">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">ID: {{ product.id }}</div>
          <div class="text-overline mb-4">App-ID: {{ product.appId }}</div>
          <v-list-item-title class="text-h5 mb-2">{{
            product.title
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ product.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="alertDescription">
          Description
        </v-btn>
        <v-btn outlined rounded text @click="alertDetails"> Details </v-btn>
        <v-btn outlined rounded text @click="showPlans"> Plans </v-btn>
      </v-card-actions>
    </v-card>

    <v-overlay :absolute="false" :value="overlay" @click="hideOverlay">
      <v-progress-circular
        indeterminate
        color="primary"
        v-if="isLoading"
      ></v-progress-circular>
      <v-card v-else>
        <v-list-item-title
          class="text-h2"
          v-if="!hasPlans"
          style="padding: 20px"
        >
          No plans for this product
        </v-list-item-title>
        <v-row no-gutters>
          <v-col v-for="(value, key, index) in plans" :key="index">
            <v-card class="pa-2 planData" outlined tile height="150px">
              <v-card-title>{{ key }}:</v-card-title>
              <v-card-subtitle>{{ value }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      overlay: false,
      isLoading: false,
      hasPlans: true,
      plans: {},
    };
  },

  methods: {
    alertDescription() {
      alert(this.product.description);
    },
    alertDetails() {
      alert(
        `This product is ${
          this.product.inSubscription ? "" : "not "
        }in subscription\nSubscription Status: ${this.product.subscription
          .split("_")
          .join(" ")}`
      );
    },
    showPlans() {
      this.isLoading = true;
      this.overlay = true;
      axios
        .get(`/products/${this.product.id}/plans`)
        .then((res) => {
          this.isLoading = false;
          if (res.data == "") {
            setTimeout(() => {
              this.overlay = false;
            }, 800);
            this.hasPlans = false;
            return;
          }
          this.plans = res.data;
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    },
    hideOverlay() {
      this.overlay = false;
      this.isLoading = false;
    },
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
