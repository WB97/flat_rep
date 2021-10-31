import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  title: { type: String },
  artist: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  like: { type: Number, default: 0, require: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

musicSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const music = mongoose.model("music", musicSchema);
export default music;
