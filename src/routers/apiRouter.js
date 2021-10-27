import express from "express";
import {
  pushPlaylist,
  deletePlaylist,
  likeMusic,
  commentMusic,
} from "../controllers/musicController.js";
import { protectorMiddleware } from "../middlewares.js";

const apiRouter = express.Router();

apiRouter
  .all(protectorMiddleware)
  .post("/musics/:id([0-9a-f]{24})/pushPlaylist", pushPlaylist);
apiRouter
  .all(protectorMiddleware)
  .post("/musics/:id([0-9a-f]{24})/deletePlaylist", deletePlaylist);
apiRouter
  .all(protectorMiddleware)
  .post("/musics/:id([0-9a-f]{24})/like", likeMusic);
apiRouter
  .all(protectorMiddleware)
  .post("/musics/:id([0-9a-f]{24})/comment", commentMusic);

export default apiRouter;
