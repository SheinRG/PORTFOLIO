import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapterNumber: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],
  tags: [String],
  imageUrl: { type: String },
  detailImageUrl: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
