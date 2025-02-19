import OrderModel from "../Models/OrderModel.js";
import OrderItemModel from "../Models/OrderItemModel.js";
import CartModel from "../Models/CartModel.js";
import ProductModel from "../Models/ProductModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cartItems = await CartModel.findAll({
      where: { userId },
      include: [{ model: ProductModel, as: "product" }],
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    const newOrder = await OrderModel.create({
      userId,
      totalPrice,
      status: "pending",
    });

    const orderItems = cartItems.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    await OrderItemModel.bulkCreate(orderItems);
    await CartModel.destroy({ where: { userId } });

    res.json({ message: "Order placed successfully", orderId: newOrder.id });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

export const viewOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.findAll({
      where: { userId },
      include: [
        {
          model: OrderItemModel,
          as: "items",
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: ["id", "name", "price", "imageUrl"],
            },
          ],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error("Error retrieving order history:", error);
    res.status(500).json({ message: "Error retrieving order history", error });
  }
};
