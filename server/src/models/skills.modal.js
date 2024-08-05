import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);

// skill.model.js

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

skillSchema.index({ name: 1, category: 1 }, { unique: true });

export const Skill = mongoose.model("Skill", skillSchema);
