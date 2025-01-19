import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setSelectedCategory, setSelectedDifficulty, fetchQuestions, setIsConfiguring } from '@/lib/quizSlice';

const CATEGORIES = ['Science', 'History', 'Technology', 'Geography', 'Literature'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function ConfigScreen() {
  const dispatch = useDispatch();
  const { username, selectedCategory, selectedDifficulty } = useSelector((state) => state.quiz);

  const handleStartQuiz = () => {
    dispatch(fetchQuestions({ category: selectedCategory, difficulty: selectedDifficulty }));
    dispatch(setIsConfiguring(false));
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => dispatch(setSelectedCategory(value))}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={selectedDifficulty}
              onValueChange={(value) => dispatch(setSelectedDifficulty(value))}
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleStartQuiz}>Start Quiz</Button>
        </CardContent>
      </Card>
    </div>
  );
}