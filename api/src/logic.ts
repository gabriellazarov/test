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
      const dataMonthly = result.data[0][0];
      const dataYearly = result.data[0][1];

      return [
        {
          ID: dataMonthly.id,
          "Plan Name": dataMonthly.planName,
          "Billing Cycle": dataMonthly.billingCycle,
          Name: dataMonthly.name["en-US"],
          Type: dataMonthly.type["en-US"],
          Description: dataMonthly.description["en-US"],
        },
        {
          ID: dataYearly.id,
          "Plan Name": dataYearly.planName,
          "Billing Cycle": dataYearly.billingCycle,
          Name: dataYearly.name["en-US"],
          Type: dataYearly.type["en-US"],
          Description: dataYearly.description["en-US"],
        },
      ];
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
