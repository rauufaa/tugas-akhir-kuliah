import express from "express";
import usersController from "../controller/users-controller";

const route = express.Router()

route.get("/api/users", usersController.getAll);
route.get("/api/users/:user_id", usersController.get)
route.post("/api/users", usersController.post)
route.put("/api/users/:user_id", usersController.put)
route.patch("/api/users/:user_id", usersController.patch)
route.delete("/api/users/:user_id", usersController.remove)

export {
    route
}