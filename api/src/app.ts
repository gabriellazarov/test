import express, { Request, Response } from "express";
import { fetchPlans, fetchProducts, login } from "./logic";

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
    .catch((err) => console.log(err.message));
});

app.get("/products/:id/plans", (req: Request, res: Response) => {
  fetchPlans(req.params.id)
    .then((result) => {
      console.log(`Plan for product ${req.params.id} fetched`);
      res.status(200).json(result);
    })
    .catch((err) => res.status(Number(err.message)).send("Error has occured"));
});

app.post("/login", (req: Request, res: Response) => {
  login(req.body)
    .then((result) => {
      console.log(`User ${result.email} authenticated`);
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

module.exports = app;
