import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  colorTheme: { type: String, default: 'blue' } // 'blue' or 'yellow'
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
