import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Note from "../../models/Notes";
import mongoose from "mongoose";

// 📥 GET all notes
export async function GET() {
  try {
    await connectDB();

    const notes = await Note.find().sort({ _id: -1 });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notes" });
  }
}

// ➕ ADD new note
export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, subject, url } = await req.json();

    if (!title || !subject || !url) {
      return NextResponse.json({ error: "All fields required" });
    }

    const note = await Note.create({
      title,
      subject,
      url,
    });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add note" });
  }
}

// ❌ DELETE note
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" });
    }

   await (Note as any).findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" });
  }
}