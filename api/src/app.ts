import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());

interface productData {
  id: String;
  appId: String;
  inSubscription: Boolean;
  title: String;
  subtitle: String;
  description: String;
  subscription: String;
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/products", (req: Request, res: Response) => {
  axios
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
      console.log("fetched products");
      res.status(200).json(trProducts);
    })
    .catch((e) => console.log(e));
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}.`);
});
