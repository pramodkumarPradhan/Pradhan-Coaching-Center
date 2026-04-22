import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMaterial extends Document {
  title: string;
  category: 'Book' | 'Supporting Material' | 'Formula';
  class: string;
  subject: string;
  size: string;
  url: string;
  icon: string;
  createdAt: Date;
}

const MaterialSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ['Book', 'Supporting Material', 'Formula'] },
    class: { type: String, required: true },
    subject: { type: String, required: true },
    size: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true, default: '📘' },
  },
  { timestamps: true }
);

const Material: Model<IMaterial> =
  mongoose.models.Material || mongoose.model<IMaterial>('Material', MaterialSchema);

export default Material;
