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

export function fetchPlans(id: string) {
  return axios
    .get(`${API}/products/${id}/plans`)
    .then((result) => {
      const data = [];

      for (const plan of result.data) {
        for (const cycle of plan) {
          data.push({
            ID: cycle.id,
            "Plan Name": cycle.planName,
            "Billing Cycle": cycle.billingCycle,
            Name: cycle.name["en-US"],
            Type: cycle.type["en-US"],
            Description: cycle.description["en-US"],
          });
        }
      }

      return data;
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
