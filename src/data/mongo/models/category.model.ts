import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
categorySchema.virtual("id").get(function () {
  return this._id.toString();
});
categorySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, { _id, __v, ...rest }) => ({ ...rest }),
});

export const CategoryModel = mongoose.model("Category", categorySchema);
