import User from "../models/User.js";
import Music from "../models/Music.js";
import mongoose from "mongoose";
import {
  playlistData,
  uploadData,
  allMusic,
  nodeID3Read,
} from "./loadPlaylist.js";
import Notice from "../models/Noticeboard.js";

export const noticeboard = async (req, res) => {
  const notices = await Notice.find({})
    .sort({ createdAt: "asc" })
    .populate("owner");
  if (!req.session.user) {
    return res.render("noticeboard", { pageTitle: "Notice board", notices });
  }
  const { _id } = req.session.user;
  const pageNum = Math.ceil(notices.length / 5);
  const user = await User.findById(_id).populate("playlist");
  const _playlistData = playlistData(user.playlist);
  return res.render("noticeboard", {
    pageTitle: "Notice board",
    user,
    notices,
    pageNum,
    _playlistData,
  });
};

export const getPosting = async (req, res) => {
  return res.render("posting", { pageTitle: "posting" });
};

export const postPosting = async (req, res) => {
  const {
    session: { user },
    body: { title, mainText },
  } = req;
  const saveMainText = mainText.replaceAll("\n", "<br>");
  const len = await Notice.find({});
  const len2 = len.length + 1;
  const dbuser = await User.findById(user._id);
  const notice = await Notice.create({
    num: len2,
    title,
    mainText: saveMainText,
    owner: user._id,
    ownerName: user.name,
  });
  await notice.save();
  dbuser.notices.push(notice._id);
  await dbuser.save();
  console.log(notice);
  return res.sendStatus(201);
};

export const getNotice = async (req, res) => {
  const { id } = req.params;
  const notice = await Notice.findById(id).populate("owner");
  if (!req.session.user) {
    return res.render("notice", { pageTitle: "notice", notice });
  } else {
    const { _id } = req.session.user;
    const user = await User.findById(_id).populate("playlist");
    const _playlistData = playlistData(user.playlist);
    return res.render("notice", {
      pageTitle: "notice",
      notice,
      user,
      _playlistData,
    });
  }
};

export const delNotice = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const notice = await Notice.findById(id);
  if (String(notice.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Notice.findByIdAndDelete(id);
  return res.redirect("/noticeboard/0");
};

export const pageMove = async (req, res) => {
  const { page } = req.params;
  const intPage = parseInt(page) * 10;
  const notices = await Notice.find({}).sort({ createdAt: -1 });
  let save = [];
  const pageNum = Math.ceil(notices.length / 10);
  if (!req.session.user) {
    for (let i = intPage; i < notices.length; ++i) {
      save.push(notices[i]);
      if (i >= intPage + 9) {
        return res.render("noticeboard", {
          pageTitle: "Notice board",
          save,
          pageNum,
        });
      }
    }
    return res.render("noticeboard", {
      pageTitle: "Notice board",
      save,
      pageNum,
    });
  } else {
    const { _id } = req.session.user;
    const user = await User.findById(_id).populate("playlist");
    const _playlistData = playlistData(user.playlist);
    for (let i = intPage; i < notices.length; ++i) {
      save.push(notices[i]);
      if (i >= intPage + 9) {
        return res.render("noticeboard", {
          pageTitle: "Notice board",
          save,
          user,
          pageNum,
          _playlistData,
        });
      }
    }
    return res.render("noticeboard", {
      pageTitle: "Notice board",
      save,
      user,
      pageNum,
      _playlistData,
    });
  }
};
