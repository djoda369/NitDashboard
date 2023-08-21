import nc from "next-connect";
import db from "@/helpers/db";
import Product from "@/models/Products";

const handler = nc();

handler.put(async (req, res) => {
  try {
    db.connectDb();

    const productId = req.query.productId; // Pretpostavka: Vaša ruta za izmenu uključuje productId u URL-u
    const updatedProduct = req.body; // Očekujemo da šaljete celokupne izmene

    const result = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true, // Vraćanje ažuriranog dokumenta
    });

    if (!result) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

export default handler;
