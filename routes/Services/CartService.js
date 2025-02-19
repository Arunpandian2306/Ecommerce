import CartModel from "../Models/CartModel.js";
import ProductModel from "../Models/ProductModel.js";

export const createCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await ProductModel.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await CartModel.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      await CartModel.create({ userId, productId, quantity });
    }

    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cartItem = await CartModel.findOne({
      where: { userId, productId },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Cart quantity updated successfully" });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Error updating cart quantity", error });
  }
};

export const viewCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await CartModel.findAll({
      where: { userId },
      include: [
        {
          model: ProductModel,
          as: "product",
        },
      ],
    });

    const updatedCartItems = cartItems.map((item) => ({
      ...item.toJSON(),
      totalPrice: item.quantity * item.product.price,
    }));

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Error retrieving cart", error });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({ message: "cartId is required" });
    }

    const deleted = await CartModel.destroy({ where: { id: cartId } });
    console.log("Deleted:", deleted);

    if (deleted) {
      res.json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing item:", error);
    res
      .status(500)
      .json({ message: "Error removing item", error: error.message || error });
  }
};
