const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },

    language: {
      type: String,
      enum: ["cpp", "python", "java"],
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    verdict: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Wrong Answer",
        "Compilation Error",
        "Runtime Error",
        "Time Limit Exceeded",
        "Memory Limit Exceeded",
        "Internal Error",
      ],
      default: "Pending",
      index: true,
    },

    runtime: {
      type: Number,
      default: null,
    },

    memory: {
      type: Number,
      default: null,
    },

    passedTestCases: {
      type: Number,
      default: 0,
    },

    totalTestCases: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);