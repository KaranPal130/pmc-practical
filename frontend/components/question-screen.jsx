import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedAnswer, setCurrentQuestionIndex, incrementScore, setQuizComplete, setTimeLeft, quizAPI } from '@/lib/quizSlice';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function QuestionScreen() {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, selectedAnswer, score, timeLeft, username } = useSelector((state) => state.quiz);
  const currentQuestion = questions?.[currentQuestionIndex];
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    if (!questions?.length) {
      return;
    }

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        dispatch(setTimeLeft(timeLeft - 1));
      } else {
        handleNextQuestion();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions, dispatch]);


  if (!questions?.length || !currentQuestion) {
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardContent className="p-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No questions available. Please try again later.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    dispatch(setSelectedAnswer(answer));

    console.log("answer:", answer);
    
    const correctAnswer = currentQuestion.options[currentQuestion.correctAnswer];
    // Store answer
    setUserAnswers(prev => [...prev, {
      questionId: currentQuestion._id,
      userAnswer: answer,
      isCorrect: answer === correctAnswer
    }]);
  
    if (answer === correctAnswer) {
      dispatch(incrementScore());
    }
  };

  const submitQuizResults = async () => {
    try {
      const scoreData = {
        username,
        score: score,
        totalQuestions: questions.length,
        difficulty: questions[0].difficulty,
        category: questions[0].category,
        percentage: `${((score / questions.length) * 100).toFixed(2)}%`,
        timestamp: new Date().toISOString(),
      };
  
      const response = await quizAPI.submitScore(scoreData);
      if (response.status === 201) {
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };
  

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      dispatch(setTimeLeft(15));
      dispatch(setSelectedAnswer(null));
    } else {
      submitQuizResults();
      dispatch(setQuizComplete(true));
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 space-y-6">
      <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="flex items-center text-orange-500">
            <Clock className="mr-2 h-4 w-4" />
            <span>{timeLeft}s</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-lg font-medium">{currentQuestion.question}</div>
            <div className="space-y-2">
              {currentQuestion.options.map((answer, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === answer ? 'solid' : 'outline'}
                  onClick={() => handleAnswer(answer)}
                  className="w-full"
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}