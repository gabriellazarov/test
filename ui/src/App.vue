<template>
  <v-app>
    <v-main>
      <ProductList />
    </v-main>
  </v-app>
</template>

<script>
import ProductList from "./components/ProductList";

export default {
  name: "App",

  components: {
    ProductList,
  },
};
</script>
