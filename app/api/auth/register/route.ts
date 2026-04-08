import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, phone, password } = await req.json();

  const existing = await User.findOne({ phone });
  if (existing) {
    return NextResponse.json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "Registered" });
}