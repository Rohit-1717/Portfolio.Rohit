import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Skill,Category} from "../models/skills.modal.js";
export const addSkill = asyncHandler(async (req, res) => {
  const { name, categoryId } = req.body;

  if (!name || !categoryId) {
    throw new ApiError(400, "Name and category ID are required");
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const skill = await Skill.create({ name, category: categoryId });

  return res
    .status(201)
    .json(new ApiResponse(201, skill, "Skill added successfully"));
});

export const removeSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Skill removed successfully"));
});

export const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const category = await Category.create({ name });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category added successfully"));
});

export const fetchSkills = asyncHandler(async (req, res) => {
  const { categoryId } = req.query;

  let query = {};
  if (categoryId) {
    query.category = categoryId;
  }

  const skills = await Skill.find(query).populate("category", "name");

  return res
    .status(200)
    .json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

export const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});
