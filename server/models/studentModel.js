import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  teamID: [{
    type: String
  }],
  notifications: {
    type: [String],
    default: []
  },
  performanceRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  activeProjects: {
    type: Number,
    default: 0
  },
  archivedProjects: {
    type: Number,
    default: 0
  },
  linkedInURL: {
    type: String,
    default: ''
  },
  githubURL: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Student = mongoose.model("studentsCollection", StudentSchema);
export default Student
