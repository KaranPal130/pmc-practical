'use client';

import { Loader2 } from 'lucide-react';
import ConfigScreen from '@/components/config-screen';
import QuestionScreen from '@/components/question-screen';
import ResultScreen from '@/components/result-screen';
import LeaderboardScreen from '@/components/leaderboard-screen';
import { useSelector } from 'react-redux';

export default function QuizPage() {
  const { isConfiguring, quizComplete, showLeaderboard, isLoading } = useSelector((state) => state.quiz);

  if (isConfiguring) return <ConfigScreen />;
  if (showLeaderboard) return <LeaderboardScreen />;
  if (quizComplete) return <ResultScreen />;
  return <QuestionScreen />;
}