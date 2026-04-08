import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  url: String,
});

export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);

  