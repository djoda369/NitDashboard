import nc from "next-connect";
import db from "@/helpers/db";
import Product from "@/models/Products";

const handler = nc();

handler.delete(async (req, res) => {
  try {
    db.connectDb();

    const productId = req.query.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Proizvod uspešno izbrisan!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
