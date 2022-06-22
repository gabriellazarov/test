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
        const products = result.data.tiles.slice(1);
        const trProducts: ProductData[] = [];
        for (const product of products) {
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
      .catch((e) => console.log(e))
  );
}

export function fetchPlans(id: String) {
  return axios
    .get(`${API}/products/${id}/plans`)
    .then((result) => {
      const data = result.data[0][0];

      return {
        ID: data.id,
        "Plan Name": data.planName,
        "Billing Cycle": data.billingCycle,
        Name: data.name["en-US"],
        Type: data.type["en-US"],
        Description: data.description["en-US"],
      };
    })
    .catch((e) => console.log(e));
}
export function login(cred: Credentials) {
  return axios
    .post(`${API}/signin`, cred)
    .then((result) => {
      return result.data;
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
