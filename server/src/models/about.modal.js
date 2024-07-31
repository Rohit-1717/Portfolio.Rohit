import { mongoose, Schema } from "mongoose";

const aboutSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export { About };
