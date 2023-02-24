import express from "express";

import { getTaskRouter } from "./routes/taskRouter";
import { getInitRouter } from "./routes/initRouter";

export const app = express();
export const rootRoute = "/api";
export const taskRoute = rootRoute + "/task";

app.use(express.json());

app.use("/", getInitRouter());
app.use(taskRoute, getTaskRouter());
