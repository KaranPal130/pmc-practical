const Questions = require('../models/questions.model');
const Submission = require('../models/submissions.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Get random questions based on filter criteria
 * @param {Object} filter - Filter criteria (category, difficulty, limit)
 * @returns {Promise<Array>} Array of questions
 */
const getQuestions = async (filter) => {
  try {
    // Ensure limit is a valid number
    const limit = parseInt(filter.limit) || 10;
    delete filter.limit;

    // Only include non-null filter values
    const validFilter = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    const questions = await Questions.aggregate([
      { $match: validFilter },
      { $sample: { size: limit }}
    ]);

    return questions;

  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(501, 'Error fetching questions');
  }
};

/**
 * Score submitted quiz answers
 * @param {Object} submission - Quiz submission data
 * @returns {Promise<Object>} Submission result
 */
const scoreQuestions = async (submission) => {
  try {
    const { username, score, totalQuestions, difficulty, category } = submission;

    // Validate required fields
    if (!username || score == null || !totalQuestions || !difficulty || !category) {
      throw new ApiError(400, 'Missing required submission fields');
    }

    // Calculate percentage
    const percentage = Math.round((score / totalQuestions) * 100);

    const newScore = {
      username,
      score,
      totalQuestions,
      difficulty,
      category,
      percentage,
      timestamp: new Date()
    };

    await Submission.create(newScore);
    return newScore;

  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(501, 'Error saving score');
  }
};
/**
 * Get leaderboard with optional filters
 * @param {Object} filter - Filter criteria (difficulty, category) 
 * @returns {Promise<Array>} Leaderboard entries
 */
const getLeaderboard = async (filter) => {
  try {
    // Only include non-null filter values
    const validFilter = Object.entries(filter).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    const leaderboard = await Submission.find(validFilter)
    return leaderboard;

  } catch (error) {
    console.log(error);
    throw new ApiError(500, 'Error fetching leaderboard');
  }
};

module.exports = {
  getQuestions,
  scoreQuestions, 
  getLeaderboard
};