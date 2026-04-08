import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();

  const { phone, password } = await req.json();

  const user = await User.findOne({ phone });
  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRET_KEY",
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    token,
    user: {
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
  });
}