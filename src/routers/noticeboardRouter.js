import express from "express";
import {
  noticeboard,
  getPosting,
  getNotice,
} from "../controllers/noticeboardController.js";

const noticeboardRouter = express.Router();

noticeboardRouter.route("/").get(noticeboard);
noticeboardRouter.route("/:id([0-9a-f]{24})/posting").get(getPosting);
noticeboardRouter.route("/:id([0-9a-f]{24})").get(getNotice);

export default noticeboardRouter;
