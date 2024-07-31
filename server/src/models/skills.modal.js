import { mongoose, Schema } from "mongoose";

const skillSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    frontend: [String],
    backend: [String],
    softSkills: [String],
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
export { Skill };
