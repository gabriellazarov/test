import axios from "axios";
import { productData } from "./interfaces";

export function fetchProducts() {
  return axios
    .get("https://iq.dev.inrix.com/api/products")
    .then((result) => {
      let products = result.data.tiles.slice(1);
      let trProducts: productData[] = [];
      for (let product of products) {
        trProducts.push({
          id: product.id,
          appId: product.appId,
          inSubscription: product.inSubscription,
          title: product.title["en-US"],
          subtitle: product.subTitle["en-US"],
          description: product.description["en-US"],
          subscription: product.subscription,
        });
      }
      return trProducts;
    })
    .catch((e) => console.log(e));
}
