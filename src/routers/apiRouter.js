import express from "express";
import { pushPlaylist } from "../controllers/musicController.js";
import { protectorMiddleware } from "../middlewares.js";

const apiRouter = express.Router();

apiRouter
  .all(protectorMiddleware)
  .post("/musics/:id([0-9a-f]{24})/pushPlaylist", pushPlaylist);

export default apiRouter;
