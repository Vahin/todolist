import express from "express";
import cors from "cors";

import { getTaskRouter } from "./routes/taskRouter";
import { getInitRouter } from "./routes/initRouter";

export const app = express();
export const rootRoute = "/api";
export const taskRoute = rootRoute + "/task";

app.use(express.json());
app.use(cors());

app.use(rootRoute, getInitRouter());
app.use(taskRoute, getTaskRouter());
