import Product from "../Models/product.js";
import cloudinaryPkg from "cloudinary"; // ✅ Import Cloudinary properly
const cloudinary = cloudinaryPkg.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🟢 Create Product
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

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// 🔵 Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.findByPk(id);

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
    res.status(500).json({ message: "Error updating product", error });
  }
};

// 🔴 Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete image from Cloudinary
    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop()?.split(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// 🟡 List Products
export const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
