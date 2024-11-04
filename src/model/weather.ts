import mongoose, { Schema, Document } from "mongoose";

interface Iweather extends Document {
  date?: number;
}

const weatherSchema: Schema = new Schema(
  {
    date: { type: Number, default: Date.now() },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: false,
  }
);

export default mongoose.model<Iweather>("weather", weatherSchema);
