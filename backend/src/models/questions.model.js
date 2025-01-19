const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of options
  correctAnswer: { type: Number, required: true }, // Index of the correct answer
  category: { type: String, required: true }, // Optional for categories
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true }, // Difficulty levels
});

questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

module.exports = mongoose.model('Question', questionSchema);
