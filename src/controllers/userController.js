import User from "../models/User.js";
import bcrypt from "bcrypt";
import { playlistData, uploadData } from "./loadPlaylist.js";

export const getJoin = (req, res) => {
  return res.render("join", {
    pageTitle: "Create Account",
  });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "Password confirmation does not match.",
    });
  }
  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Create Account",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;
  console.log(req.session.user);
  let editErrorMessage = [];
  const dbUser = await User.findById(_id);
  const usernameExits =
    dbUser.username !== username && (await User.exists({ username }));
  const emailExits = dbUser.email !== email && (await User.exists({ email }));

  if (usernameExits) {
    editErrorMessage.push("already Exists username");
  }
  if (emailExits) {
    editErrorMessage.push("already Exists email");
  }
  if (usernameExits || emailExits) {
    return res.status(400).render("users/edit-profile", {
      pageTitle: "Edit Profile",
      errorMessage: editErrorMessage,
    });
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPass, newPass, newPass2 },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPass, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Current password is incorrect",
    });
  }
  if (newPass !== newPass2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Password does not match the confirmation",
    });
  }
  user.password = newPass;
  await user.save();
  return res.redirect("/users/logout");
};

export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate({
      path: "musics",
      populate: {
        path: "owner",
        model: "user",
      },
    })
    .populate("playlist");
  const _playlistData = playlistData(user.playlist);
  const _uploadData = uploadData(user.musics);
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User Not found" });
  }
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
    _playlistData,
    _uploadData,
  });
};
