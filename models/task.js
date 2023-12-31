const mongoose = require("mongoose");

const date = new Date()
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      default: `${date.getHours().toString()}:${date.getMinutes().toString()}`,
    },
    end: {
      type: String,
      default: `${(date.getHours()+1).toString()}:${date.getMinutes().toString()}`,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      default: "to-do",
      trim: true,
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
