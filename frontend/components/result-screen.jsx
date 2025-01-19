import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { Award, Trophy } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaderboard } from '@/lib/quizSlice';

export default function ResultScreen() {
  const dispatch = useDispatch();
  const { score, questions, username, selectedCategory, selectedDifficulty } = useSelector((state) => state.quiz);
  const percentage = ((score / questions.length) * 100).toFixed(1);

  // Get performance message based on score percentage
  const getPerformanceMessage = () => {
    if (Number(percentage) >= 80) return "Excellent work!";
    if (Number(percentage) >= 60) return "Good job!";
    if (Number(percentage) >= 40) return "Nice try!";
    return "Keep practicing!";
  };

  const handleViewLeaderboard = () => {
    dispatch(fetchLeaderboard({ category: selectedCategory, difficulty: selectedDifficulty }));
    dispatch({ type: 'quiz/setShowLeaderboard', payload: true });
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-fit mb-4">
            <Award className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl mb-2">Quiz Complete!</CardTitle>
          <CardDescription>
            {getPerformanceMessage()}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Score Stats */}
            <div className="rounded-lg bg-muted p-6 text-center space-y-2">
              <div className="text-2xl font-bold">
                {score} / {questions.length}
              </div>
              <div className="text-lg text-muted-foreground">
                Final Score: {percentage}%
              </div>
            </div>

            {/* Performance Details */}
            <Alert>
              <AlertDescription className="text-center">
                You answered {score} questions correctly out of {questions.length}
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => dispatch({ type: 'quiz/resetQuiz' })}
              >
                Try Again
              </Button>
              <Button 
                className="w-full sm:w-auto"
                onClick={handleViewLeaderboard}
              >
                <Trophy className="mr-2 h-4 w-4" />
                View Leaderboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}