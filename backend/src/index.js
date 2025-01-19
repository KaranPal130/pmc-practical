const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const Question = require('./models/questions.model'); // Ensure you have the Question model

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const seedQuestions = async () => {
    const questions = [
        {
          question: 'What is the largest planet in our solar system?',
          options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
          correctAnswer: 2, // Jupiter
          category: 'Science',
          difficulty: 'Easy',
        },
        {
          question: 'Who painted the Mona Lisa?',
          options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
          correctAnswer: 1, // Leonardo da Vinci
          category: 'Art',
          difficulty: 'Easy',
        },
        {
          question: 'What is the smallest prime number?',
          options: ['0', '1', '2', '3'],
          correctAnswer: 2, // 2
          category: 'Mathematics',
          difficulty: 'Easy',
        },
        {
          question: 'Which programming language is used for web development?',
          options: ['Python', 'HTML', 'Java', 'C++'],
          correctAnswer: 1, // HTML
          category: 'Technology',
          difficulty: 'Easy',
        },
        {
          question: 'In which year did World War II end?',
          options: ['1940', '1945', '1950', '1939'],
          correctAnswer: 1, // 1945
          category: 'History',
          difficulty: 'Medium',
        },
        {
          question: 'What is the capital of Japan?',
          options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
          correctAnswer: 2, // Tokyo
          category: 'Geography',
          difficulty: 'Easy',
        },
        {
          question: 'Which element has the chemical symbol "O"?',
          options: ['Oxygen', 'Gold', 'Osmium', 'Opal'],
          correctAnswer: 0, // Oxygen
          category: 'Science',
          difficulty: 'Easy',
        },
        {
          question: 'Who wrote the play "Romeo and Juliet"?',
          options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'George Orwell'],
          correctAnswer: 0, // William Shakespeare
          category: 'Literature',
          difficulty: 'Easy',
        },
        {
          question: 'Which country hosted the 2016 Summer Olympics?',
          options: ['China', 'Brazil', 'United Kingdom', 'Japan'],
          correctAnswer: 1, // Brazil
          category: 'Sports',
          difficulty: 'Medium',
        },
        {
          question: 'What is the speed of light?',
          options: [
            '299,792 km/s',
            '300,000 km/s',
            '150,000 km/s',
            '100,000 km/s',
          ],
          correctAnswer: 0, // 299,792 km/s
          category: 'Science',
          difficulty: 'Hard',
        },
        {
          question: 'Who discovered penicillin?',
          options: ['Alexander Fleming', 'Marie Curie', 'Isaac Newton', 'Albert Einstein'],
          correctAnswer: 0, // Alexander Fleming
          category: 'Science',
          difficulty: 'Medium',
        },
        {
          question: 'What is the capital city of Australia?',
          options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
          correctAnswer: 2, // Canberra
          category: 'Geography',
          difficulty: 'Medium',
        },
        {
          question: 'Which planet is known as the Red Planet?',
          options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
          correctAnswer: 2, // Mars
          category: 'Science',
          difficulty: 'Easy',
        },
        {
          question: 'Who developed the theory of relativity?',
          options: [
            'Isaac Newton',
            'Albert Einstein',
            'Galileo Galilei',
            'Nikola Tesla',
          ],
          correctAnswer: 1, // Albert Einstein
          category: 'Science',
          difficulty: 'Medium',
        },
        {
          question: 'What is the hardest natural substance on Earth?',
          options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
          correctAnswer: 2, // Diamond
          category: 'Science',
          difficulty: 'Easy',
        },
        {
          question: 'What is the currency of Japan?',
          options: ['Yen', 'Won', 'Dollar', 'Euro'],
          correctAnswer: 0, // Yen
          category: 'Geography',
          difficulty: 'Easy',
        },
        {
          question: 'Which gas do plants primarily absorb during photosynthesis?',
          options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
          correctAnswer: 1, // Carbon Dioxide
          category: 'Science',
          difficulty: 'Easy',
        },
        {
          question: 'Which ocean is the largest in the world?',
          options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
          correctAnswer: 3, // Pacific
          category: 'Geography',
          difficulty: 'Easy',
        },
        {
          question: 'What does HTML stand for?',
          options: [
            'HyperText Markup Language',
            'Hyperlink and Text Markup Language',
            'Home Tool Markup Language',
            'Hyper Tool Management Language',
          ],
          correctAnswer: 0, // HyperText Markup Language
          category: 'Technology',
          difficulty: 'Easy',
        },
        {
          question: 'What is the boiling point of water at sea level?',
          options: ['90°C', '100°C', '120°C', '80°C'],
          correctAnswer: 1, // 100°C
          category: 'Science',
          difficulty: 'Easy',
        },
      ];
      

  await Question.insertMany(questions);
  console.log('Database seeded!');
};

seedQuestions();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);