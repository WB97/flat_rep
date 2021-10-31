import User from "../models/User.js";
import Notice from "../models/Noticeboard.js";

export const noticeboard = async (req, res) => {
  const notices = await Notice.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  if (!req.session.user) {
    return res.render("noticeboard", { pageTitle: "Notice board", notices });
  }
  const { _id } = req.session.user;
  const user = await User.findById(_id);
  // console.log(_id);
  return res.render("noticeboard", { pageTitle: "Notice board", notices });
};

export const getPosting = async (req, res) => {
  return res.render("posting", { pageTitle: "posting" });
};

export const postPosting = async (req, res) => {
  const {
    session: { user },
    body: { title, mainText },
  } = req;
  const dbuser = await User.findById(user._id);
  const notice = await Notice.create({
    title,
    mainText,
    owner: user._id,
    ownerName: user.name,
  });
  await notice.save();
  return res.sendStatus(201);
};

export const getNotice = (req, res) => {
  return res.send("getNotice");
};
