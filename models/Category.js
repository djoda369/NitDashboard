import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const CathSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    vrsta: {
      type: String,
    },
  },
  {
    timestamps: true,
    required: true,
  }
);

const Cath =
  mongoose.models.Categories || mongoose.model("Categories", CathSchema);

export default Cath;
