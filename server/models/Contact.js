import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true }, // Added subject field
    message: { type: String, required: true },
    status: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);