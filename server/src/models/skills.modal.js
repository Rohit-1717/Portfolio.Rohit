import { mongoose, Schema } from "mongoose";

const skillItemSchema = new Schema({
  _id: {
    type: String,
    default: function () {
      return new mongoose.Types.ObjectId().toString();
    },
  },
  name: {
    type: String,
    required: true,
  },
});

const skillSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    frontend: [skillItemSchema],
    backend: [skillItemSchema],
    softSkills: [skillItemSchema],
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
export { Skill };
