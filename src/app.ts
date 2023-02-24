import express from "express";

import { getTaskRouter } from "./routes/taskRouter";
import { getInitRouter } from "./routes/initRouter";

export const app = express();

app.use(express.json());

app.use("/", getInitRouter());
app.use("/task", getTaskRouter());
