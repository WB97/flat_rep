import express from "express";
import {
  getEdit,
  postEdit,
  playMusic,
  getUpload,
  postUpload,
  remove,
} from "../controllers/musicController.js";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  musicUpload,
} from "../middlewares.js";

const musicRouter = express.Router();

musicRouter.get("/:id([0-9a-f]{24})", playMusic);
musicRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
musicRouter
  .route("/:id([0-9a-f]{24})/remove")
  .all(protectorMiddleware)
  .get(remove);
musicRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(musicUpload.single("music"), postUpload);

export default musicRouter;
