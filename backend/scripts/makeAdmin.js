import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();
const email = process.argv[2];

if (!email) {
  console.error("Usage: node scripts/makeAdmin.js user@example.com");
  process.exit(1);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: "admin" },
    { new: true }
  );
  if (!user) console.error(`No user found with email: ${email}`);
  else console.log(`${user.email} is now an admin.`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });