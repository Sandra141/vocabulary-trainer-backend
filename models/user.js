import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
const userSchema = mongoose.Schema({
  location: String,
  email: String,
  age: Number,
  relationshipStatus: String,
  avatar: String,
  wantsEmail: Boolean,
  password: String,
  subscriptionAgreement: Boolean,
  accountType: String,
  lastLoginDate: String,
});

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    console.log("userSchema.pre", this.password, salt, hash);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  console.log("userSchema.methods.validatePassword", data, this.password)

  return bcrypt.compare(data, this.password);
};

const User = new mongoose.model("user", userSchema);
export default User;
