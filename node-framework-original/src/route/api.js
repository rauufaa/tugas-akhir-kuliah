import express from "express";
import productsController from "../controller/products-controller.js";

const route = express.Router()

route.get("/api/products/:code", productsController.get)
route.post("/api/products", productsController.post)
route.put("/api/products/:code", productsController.put)
route.patch("/api/products/:code", productsController.patch)
route.delete("/api/products/:code", productsController.remove)

export {
    route
}