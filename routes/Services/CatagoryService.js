import CategoryModel from "../Models/CategoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await CategoryModel.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res
      .status(422)
      .json({ message: "Error creating category", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await CategoryModel.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(422).json({ message: "Error updating category", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: "Error deleting category", error });
  }
};

export const listCategories = async (_req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.json(categories);
  } catch (error) {
    res.status(422).json({ message: "Error retrieving categories", error });
  }
};
