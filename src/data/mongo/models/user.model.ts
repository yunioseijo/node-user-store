import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
    default: "USER_ROLE",
  },
});
userSchema.virtual("id").get(function () {
  return this._id.toString();
});
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, { _id, __v, password, ...rest }) => ({ ...rest }),
});

export const UserModel = mongoose.model("User", userSchema);
