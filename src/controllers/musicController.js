import Music from "../models/Music.js";
import User from "../models/User.js";
import {
  playlistData,
  uploadData,
  allMusic,
  nodeID3Read,
} from "./loadPlaylist.js";

export const homepageMusics = async (req, res) => {
  let user;
  let _playlistData;
  let _uploadData;
  if (req.session.user) {
    const { _id } = req.session.user;
    user = await User.findById(_id).populate("musics").populate("playlist");

    _playlistData = playlistData(user.playlist);
    _uploadData = uploadData(user.musics);
  }
  const musics = await Music.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  const _allMusic = allMusic(musics);
  return res.render("home", {
    pageTitle: "Home",
    _allMusic,
    _playlistData,
    _uploadData,
    user,
  });
};

export const playMusic = async (req, res) => {
  let user;
  let _playlistData;
  if (req.session.user) {
    const { _id } = req.session.user;
    user = await User.findById(_id).populate("playlist");
    _playlistData = playlistData(user.playlist);
  }
  const { id } = req.params;
  const music = await (await Music.findById(id)).populate("owner");

  const musicData = nodeID3Read(music.fileUrl);
  const base64 = new Buffer.from(musicData.image.imageBuffer).toString(
    "base64"
  );

  if (!music) {
    return res.status(404).render("404", { pageTitle: "Music not found." });
  }
  return res.render("musics/playMusic", {
    pageTitle: music.name,
    music,
    musicData,
    _playlistData,
    base64,
  });
};

export const getUpload = (req, res) => {
  return res.render("musics/upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    file,
    body: { hashtags },
    session: {
      user: { _id },
    },
  } = req;
  const saveMusicData = nodeID3Read(file.path);
  const base64 = new Buffer.from(saveMusicData.image.imageBuffer).toString(
    "base64"
  );
  // console.log(saveMusicData);
  let strHashtags = String(hashtags);
  try {
    const newMusic = await Music.create({
      fileUrl: file.path,
      title: saveMusicData.title,
      artist: saveMusicData.artist,
      hashtags: Music.formatHashtags(strHashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.musics.push(newMusic._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("musics/upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const music = await Music.findById(id);
  if (!music) {
    return res.status(404).render("404", { pageTitle: "Music not found." });
  }
  if (String(music.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("musics/edit", {
    pageTitle: `Editing ${music.name}`,
    music,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const music = await Music.exists({ _id: id });
  const _music = await Music.findById(id);
  const { hashtags } = req.body;
  if (!music) {
    return res.status(404).render("404", { pageTitle: "Music not found." });
  }
  if (String(_music.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Music.findByIdAndUpdate(id, {
    hashtags: Music.formatHashtags(hashtags),
  });
  return res.redirect(`/musics/${id}`);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const _music = await Music.findById(id);
  if (String(_music.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Music.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let musics = [];
  if (keyword) {
    musics = await Music.find({
      name: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search Music", musics });
};

export const pushPlaylist = async (req, res) => {
  const { id } = req.params;
  if (req.session.loggedIn === true) {
    const { _id } = req.session.user;
    const user = await User.findById(_id);
    const check = user.playlist.includes(id);
    if (check) {
      return res.sendStatus(401);
    }
    user.playlist.push(id);
    await user.save();
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
};
