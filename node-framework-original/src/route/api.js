import express from "express";
import productsController from "../controller/products-controller.js";

const route = express.Router()

route.get("/products/:code", productsController.get)
route.post("/products", productsController.post)
route.put("/products/:code", productsController.put)
route.patch("/products/:code", productsController.patch)
route.delete("/products/:code", productsController.remove)

export {
    route
}