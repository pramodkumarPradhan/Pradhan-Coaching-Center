import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  phone: string;
  password: string;
  role?: "user" | "admin";
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

// ✅ IMPORTANT: typed model
const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);

export default User;