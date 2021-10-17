import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  musics: [{ type: mongoose.Schema.Types.ObjectId, ref: "music" }],
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "music" }],
  likemusic: [{ type: mongoose.Schema.Types.ObjectId, ref: "music" }],
});

userSchema.pre("save", async function () {
  //비밀번호가 변경될경우에만 해시
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("user", userSchema);
export default User;
