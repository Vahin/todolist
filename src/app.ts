import { getInitRouter } from "./routes/initRouter";
import express from "express";

export const app = express();

app.use(express.json());

app.use("/", getInitRouter());
