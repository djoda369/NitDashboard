import nc from "next-connect";
import db from "@/helpers/db";
import Product from "@/models/Products";

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();

    const prozivod = req.body;
    if (
      prozivod.name === "" ||
      prozivod.description === "" ||
      prozivod.category === "" ||
      prozivod.price === "" ||
      prozivod.images === []
    ) {
      throw new Error({
        message: "Niste popunili sva obavezna polja za proizvod.",
      });
    }

    const newProduct = new Product({
      name: req.body.name,
      gender: req.body.gender,
      description: req.body.description,
      slug: req.body.slug,
      category: req.body.category,
      tip: req.body.tip,
      images: req.body.images,
      mainImage: req.body.mainImage,
      sizes: req.body.sizes,
      lice: req.body.lice,
      postava: req.body.postava,
      djon: req.body.djon,
      price: req.body.price,
      materijal: req.body.materijal,
      discount: req.body.discount,
      sold: req.body.sold,
      limited: req.body.limited,
      sale: req.body.sale,
      exclusive: req.body.exclusive,
      featured: req.body.featured,
    });

    try {
      await newProduct.save();
      db.disconnectDb();
      res.status(200).json({ message: "Proizvod uspešno sačuvan." });
    } catch (validationError) {
      db.disconnectDb();
      res.status(400).json({
        message: "Došlo je do greške. Ime već postoji!",
        error: validationError.message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
