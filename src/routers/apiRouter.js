import express from "express";
import {
  pushPlaylist,
  deletePlaylist,
  likeMusic,
  commentMusic,
  deleteComment,
} from "../controllers/musicController.js";
import { postPosting } from "../controllers/noticeboardController.js";
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
apiRouter
  .all(protectorMiddleware)
  .post("/musics/:id([0-9a-f]{24})/deleteComment", deleteComment);
apiRouter
  .all(protectorMiddleware)
  .post("/noticeboard/:id([0-9a-f]{24})/post", postPosting);

export default apiRouter;
