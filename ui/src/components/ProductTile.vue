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
        <v-btn outlined rounded text @click="overlay = true"> Plans </v-btn>
      </v-card-actions>
    </v-card>

    <ProductPlans
      v-if="overlay"
      :id="product.id"
      @hideOverlay="overlay = false"
    />
  </div>
</template>

<script>
import ProductPlans from "./ProductPlans.vue";

export default {
  components: { ProductPlans },

  props: {
    product: Object,
  },

  data() {
    return {
      overlay: false,
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
  },
};
</script>
