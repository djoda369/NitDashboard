import nc from "next-connect";
import db from "@/helpers/db";
import Avalablity from "@/models/Availablity";

const handler = nc();

handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const availabilityId = req.query.availabilityId; // Pretpostavljamo da ID dostupnosti dolazi preko URL-a
    const updatedAvailability = req.body;

    const result = await Avalablity.findByIdAndUpdate(
      availabilityId,
      updatedAvailability,
      {
        new: true, // Opcija koja vraća ažurirani dokument
      }
    );

    if (!result) {
      res.status(404).json({ message: "Availability not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Availability updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default handler;
