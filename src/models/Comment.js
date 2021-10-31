import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  ownerName: { type: String, required: true },
  music: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "music" },
  createdAt: { type: Date, required: true, default: Date.now },
});

const comment = mongoose.model("comment", commentSchema);

export default comment;
