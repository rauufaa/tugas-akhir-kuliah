import express from "express";
import { route } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import compression from "compression";

export const web = express()

web.use(compression({level: 9}));
web.use(express.json())
web.use("/api/v1",route)
web.use(errorMiddleware)