import mongoose, { Schema, Document } from "mongoose";

interface Iweather extends Document {
  location: string;
  temperature: string;
  description: string;
  icon: string;
  date: number;
}

const weatherSchema: Schema = new Schema(
  {
    location: { type: String, default: "" },
    temperature: { type: Number, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: true,
  }
);

export default mongoose.model<Iweather>("weather", weatherSchema);
