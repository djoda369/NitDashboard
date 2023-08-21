import nc from "next-connect";
import db from "@/helpers/db";
import bcrypt from "bcrypt";
import Admin from "@/models/Admin";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }

    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exists!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 charachters" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    const addedUser = await newUser.save();
    await db.disconnectDb();
    res.json({ message: "Register success!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default handler;
