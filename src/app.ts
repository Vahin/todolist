import express from "express";

import { getTaskRouter } from "./routes/taskRouter";
import { getInitRouter } from "./routes/initRouter";
import { getTestRouter } from "./routes/testRouter";

export const app = express();

app.use(express.json());

app.use("/", getInitRouter());
app.use("/task", getTaskRouter());
app.use("/test", getTestRouter());
