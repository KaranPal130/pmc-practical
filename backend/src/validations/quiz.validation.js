const Joi = require('joi');

createScore = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        score: Joi.number().required(),
        totalQuestions: Joi.number().required(),
        difficulty: Joi.string().required(),
        category: Joi.string().required(),
    })
}

module.exports = {
    createScore,
}