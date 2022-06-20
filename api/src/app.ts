import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import { fetchProducts } from "./logic";

const app = express();
const cors = require("cors");
const port = 8080;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/products", (req: Request, res: Response) => {
  fetchProducts()
    .then((products) => {
      console.log("fetched products");
      res.status(200).json(products);
    })
    .catch((e) => console.log(e));
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}.`);
});
