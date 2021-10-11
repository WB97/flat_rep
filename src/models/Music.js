import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  name: { type: String, required: true },
  artist: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, require: true },
    like: { type: Number, default: 0, require: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
});

musicSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const music = mongoose.model("music", musicSchema);
export default music;
