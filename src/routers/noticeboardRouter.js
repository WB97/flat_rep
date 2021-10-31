import express from "express";
import {
  noticeboard,
  getPosting,
  getNotice,
  delNotice,
  pageMove,
} from "../controllers/noticeboardController.js";
import { protectorMiddleware } from "../middlewares.js";

const noticeboardRouter = express.Router();

noticeboardRouter.route("/").get(noticeboard);
noticeboardRouter.route("/:id([0-9a-f]{24})").get(getNotice);
noticeboardRouter.route("/:id([0-9a-f]{24})/posting").get(getPosting);
noticeboardRouter
  .route("/:id([0-9a-f]{24})/remove")
  .all(protectorMiddleware)
  .get(delNotice);
noticeboardRouter.route("/:page").get(pageMove);

export default noticeboardRouter;
