import express, { Request, Response, NextFunction } from "express";
import { fetchProducts, login } from "./logic";
import { PORT } from "./config";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

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

app.post("/login", (req: Request, res: Response) => {
  console.log(JSON.stringify(req.body));
  login(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => console.log(e));
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}.`);
});
