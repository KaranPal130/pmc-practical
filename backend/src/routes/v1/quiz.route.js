const express = require('express');
const validate = require('../../middlewares/validate');
const quizValidation = require('../../validations/quiz.validation');
const quizController = require('../../controllers/quiz.controller');

const router = express.Router();

/**
 * @swagger
 * /quiz/questions:
 *   get:
 *     summary: Get random quiz questions
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of questions (e.g. Science, Art, Mathematics)
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *         description: Difficulty level of questions
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of questions to return
 *     responses:
 *       200:
 *         description: List of quiz questions
 *       404:
 *         description: No questions found matching criteria
 *       501:
 *         description: Error fetching questions
 */

/**
 * @swagger
 * /quiz/score:
 *   post:
 *     summary: Submit quiz score
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - score
 *               - totalQuestions
 *               - difficulty
 *               - category
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of quiz taker
 *               score:
 *                 type: number
 *                 description: Raw score achieved
 *               totalQuestions:
 *                 type: number
 *                 description: Total number of questions
 *               difficulty:
 *                 type: string
 *                 description: Quiz difficulty level
 *               category:
 *                 type: string
 *                 description: Quiz category
 *               percentage:
 *                 type: string
 *                 description: Quiz percentage
 *               timestamp:
 *                 type: string
 *                 description: Quiz time
 *     responses:
 *       201:
 *         description: Score saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 score:
 *                   type: number
 *                 totalQuestions:
 *                   type: number
 *                 difficulty:
 *                   type: string
 *                 category:
 *                   type: string
 *                 percentage:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing required submission fields
 *       501:
 *         description: Error saving score
 */

/**
 * @swagger
 * /quiz/leaderboard:
 *   get:
 *     summary: Get quiz leaderboard
 *     parameters:
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by quiz category
 *     responses:
 *       200:
 *         description: Top 10 scores on leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   score:
 *                     type: number
 *                   percentage:
 *                     type: number
 *                   difficulty:
 *                     type: string
 *                   category:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching leaderboard
 */

router.get('/questions', quizController.getQuestions);
router.post('/score', validate(quizValidation.scoreQuestions), quizController.scoreQuestions);
router.get('/leaderboard', quizController.getLeaderboard);

module.exports = router;