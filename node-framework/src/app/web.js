import express from "express";
import { route } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express()
web.use(express.json())
web.use(route)
web.use(errorMiddleware)