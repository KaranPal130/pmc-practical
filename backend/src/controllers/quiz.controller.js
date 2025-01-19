
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { quizService } = require('../services');

const getQuestions = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['category', 'difficulty', 'limit']);
    const response = await quizService.getQuestions(filter);
    res.send(response);
});

const scoreQuestions = catchAsync(async (req, res) => { 
    const response = await quizService.scoreQuestions(req.body);
    res.status(201).send(response);
});

const getLeaderboard = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['difficulty', 'category']);
    const response = await quizService.getLeaderboard(filter);
    res.send(response);
});

module.exports = {
    getQuestions,
    scoreQuestions,
    getLeaderboard,
};