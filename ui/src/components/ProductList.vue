<template>
  <ul class="container">
    <li v-for="product in products" :key="product.id">
      <ProductTile :product="product" />
    </li>
  </ul>
</template>

<script>
import ProductTile from "./ProductTile.vue";

export default {
  name: "ProductList",
  components: { ProductTile },

  data() {
    return {
      products: [],
    };
  },

  created() {
    this.$store.dispatch("getProducts").then((res) => (this.products = res));
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 25px;

  display: flex;
  flex-wrap: wrap;
}
li {
  flex: 50%;
  margin-bottom: 32px;
}
</style>
