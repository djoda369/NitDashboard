import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "neutral"],
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Categories",
  },
  tip: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  mainImage: { type: String },
  sizes: [
    {
      type: String,
    },
  ],
  lice: {
    type: String,
  },
  postava: {
    type: String,
  },
  djon: {
    type: String,
  },
  materijal: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  limited: {
    type: Boolean,
    default: false,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  exclusive: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
