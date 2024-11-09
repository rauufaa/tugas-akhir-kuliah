import express from "express";
import { route } from "../route/api";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express()
web.use(express.json())
web.use(route)
web.use(errorMiddleware)