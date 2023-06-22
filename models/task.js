const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      trim: true,
      required: true,
    },
    date: {
      type: Date,
    },
    category: {
      type: String,
      enum: ["toDo", "inProgress", "done"],
      default: "toDo",
      trim: true,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = {Task}
