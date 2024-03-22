import nc from "next-connect";
import db from "@/helpers/db";
import Order from "@/models/Orders"; // Pretpostavljamo da imate model narudžbine

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const orderId = req.query.orderId; // Pretpostavimo da ID narudžbine dolazi preko URL-a
    const updatedOrder = req.body; // Celokupni objekat narudžbine koji se ažurira

    const result = await Order.findByIdAndUpdate(orderId, updatedOrder, {
      new: true, // Opcija koja vraća ažurirani dokument
    });

    if (!result) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
