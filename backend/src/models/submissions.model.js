const { toJSON, paginate } = require("./plugins");
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  percentage: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
  });

  submissionSchema.plugin(toJSON);
  submissionSchema.plugin(paginate);
  
  module.exports = mongoose.model('Submission', submissionSchema);
  