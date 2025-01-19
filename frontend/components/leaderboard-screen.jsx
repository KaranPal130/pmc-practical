import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Trophy, ArrowLeft, Medal } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchLeaderboard, setShowLeaderboard } from "@/lib/quizSlice";

// Helper function to get rank medal
const RankMedal = ({ rank }) => {
  if (rank === 1) return <Medal className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />;
  return <span className="font-medium">{rank}</span>;
};

export default function LeaderboardScreen() {
  const dispatch = useDispatch();
  const { 
    leaderboard, 
    selectedCategory, 
    selectedDifficulty,
    isLoading,
    error 
  } = useSelector((state) => state.quiz);

  const fetchLeaderboardData = useCallback(() => {
    if (selectedCategory && selectedDifficulty) {
      dispatch(fetchLeaderboard({ 
        category: selectedCategory, 
        difficulty: selectedDifficulty 
      }));
    }
  }, [selectedCategory, selectedDifficulty, dispatch]);

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  const handleBack = () => {
    dispatch(setShowLeaderboard(false));
  };

  if (error) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500 mb-4">
              Failed to load leaderboard
            </div>
            <Button className="w-full" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Leaderboard</CardTitle>
              <CardDescription>
                {selectedCategory} - {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Level
              </CardDescription>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-[400px] rounded-md border">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right w-24">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard && leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                      <TableRow key={`${entry.id || entry.username}-${index}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-center">
                            <RankMedal rank={index + 1} />
                          </div>
                        </TableCell>
                        <TableCell>{entry.username}</TableCell>
                        <TableCell className="text-right">
                          {entry.score}/{entry.totalQuestions}
                        </TableCell>
                        <TableCell className="text-right">
                          {typeof entry.percentage === 'number' 
                            ? entry.percentage.toFixed(1) 
                            : '0.0'}%
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No entries yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </ScrollArea>

          <Button 
            className="w-full mt-6"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Results
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}