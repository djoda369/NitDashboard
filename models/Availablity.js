import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const AvalablitySchema = new mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String },
    date: { type: Date, default: new Date() },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Avalablity =
  mongoose.models.Avalablity || mongoose.model("Avalablity", AvalablitySchema);

export default Avalablity;
