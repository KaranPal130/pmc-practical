const { toJSON, paginate } = require("./plugins");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    totalScore: { type: Number, default: 0 }, // Total score accumulated across quizzes
    quizzesTaken: { type: Number, default: 0 }, // Total quizzes attempted
  });

  userSchema.plugin(toJSON);
  userSchema.plugin(paginate);
  
  module.exports = mongoose.model('User', userSchema);
  