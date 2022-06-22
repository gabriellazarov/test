import express, { Request, Response } from "express";
import { fetchProducts, login } from "./logic";
import { PORT } from "./config";

const app = express();
import cors from "cors";

app.use(cors());
app.use(express.json());

app.get("/products", (req: Request, res: Response) => {
  fetchProducts()
    .then((products) => {
      console.log("fetched products");
      res.status(200).json(products);
    })
    .catch((e) => console.log(e));
});

app.post("/login", (req: Request, res: Response) => {
  login(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = JSON.parse(err.message);
      console.log(error);
      res.status(error.status).json(error.message);
    });
});

app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send("API is running...");
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}.`);
});
