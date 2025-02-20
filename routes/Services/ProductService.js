import ProductModel from "../Models/ProductModel.js";
import cloudinaryPkg from "cloudinary";
const cloudinary = cloudinaryPkg.v2;
import { Op } from "sequelize";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (!name || !price || !stock || !categoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = null;
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(422)
      .json({ message: "Error creating product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;
    const product = await ProductModel.findByPk(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    let imageUrl = product.imageUrl;
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = uploadResponse.secure_url;
    }

    await product.update({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });

    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(422).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByPk(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop()?.split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(422).json({ message: "Error deleting product", error });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();
    res.json(products);
  } catch (error) {
    res.status(422).json({ message: "Error fetching products", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "price",
      sortOrder = "asc",
    } = req.query;

    const whereCondition = {};

    if (search) {
      whereCondition.name = { [Op.iLike]: `%${search}%` };
    }

    if (category) {
      whereCondition.category_id = category;
    }

    if (minPrice && maxPrice) {
      whereCondition.price = {
        [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    } else if (minPrice) {
      whereCondition.price = { [Op.gte]: parseFloat(minPrice) };
    } else if (maxPrice) {
      whereCondition.price = { [Op.lte]: parseFloat(maxPrice) };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const order = [
      [sortBy, sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC"],
    ];

    const { count, rows: products } = await ProductModel.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: offset,
      order: order,
    });

    res.json({
      totalProducts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(422).json({ message: "Error fetching products", error });
  }
};
