import axios from "axios";
import { API } from "./config";
import { Credentials, ProductData } from "./interfaces";

export function fetchProducts() {
  return (
    axios
      .get(`${API}/products`)
      /*, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }*/
      .then((result) => {
        let products = result.data.tiles.slice(1);
        let trProducts: ProductData[] = [];
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
        console.log(trProducts.length);
        return trProducts;
      })
      .catch((e) => console.log(e))
  );
}

export function login(cred: Credentials) {
  return axios
    .post(`${API}/signin`, cred)
    .then((result) => {
      console.log(result.data);
      return {
        token: result.data.accessToken.token,
        expiry: new Date(result.data.accessToken.expiry).getTime(),
      };
    })
    .catch((err) => {
      const error = JSON.stringify({
        status: err.response.status,
        message: err.response.data.message
          ? err.response.data.message
          : err.response.data,
      });
      throw new Error(error);
    });
}
