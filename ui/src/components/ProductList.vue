<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      <ProductTile :product="product" />
    </li>
  </ul>
</template>

<script>
import axios from "axios";
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
    axios
      .get("http://localhost:8080/products")
      .then((result) => {
        console.log(result.data);
        this.products = result.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 15px;
}
</style>
