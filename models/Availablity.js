import mongoose from "mongoose";

const AvalablitySchema = new mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String },
  },
  {
    timestamps: true,
  }
);

const Avalablity =
  mongoose.models.Avalablity || mongoose.model("Avalablity", AvalablitySchema);

export default Avalablity;
