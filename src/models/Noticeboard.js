import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainText: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  ownerName: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  createdAt: { type: Date, required: true, default: Date.now },
});

const notice = mongoose.model("notice", noticeSchema);

export default notice;
