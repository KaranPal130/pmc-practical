import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/v1/quiz';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizAPI = {
  getQuestions: async (category, difficulty) => {
    const response = await api.get(`/questions?category=${category}&difficulty=${difficulty}`);
    return response.data;
  },

  submitScore: async (scoreData) => {
    const response = await api.post('/score', scoreData);
    return response;
  },

  getLeaderboard: async (category, difficulty) => {
    const response = await api.get(`/leaderboard?category=${category}&difficulty=${difficulty}`);
    return response.data;
  },
};


const initialState = {
  username: '',
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  answers: {},
  score: 0,
  timeLeft: 15,
  isConfiguring: true,
  quizComplete: false,
  showLeaderboard: false,
  leaderboard: [],
  isLoading: false,
  selectedCategory: '',
  selectedDifficulty: '',
  isOffline: !navigator.onLine,
  error: null,
};

// Async Thunks
export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ category, difficulty }, { rejectWithValue }) => {
    try {
      const questions = await quizAPI.getQuestions(category, difficulty);
      
      // Cache questions for offline mode
      if (typeof window !== 'undefined') {
        localStorage.setItem('cachedQuestions', JSON.stringify(questions));
      }
      
      return questions;
    } catch (error) {
      // Try to get cached questions if fetch fails
      if (typeof window !== 'undefined') {
        const cachedQuestions = localStorage.getItem('cachedQuestions');
        if (cachedQuestions) {
          return JSON.parse(cachedQuestions);
        }
      }
      return rejectWithValue('Failed to fetch questions');
    }
  }
);

export const submitScore = createAsyncThunk(
  'quiz/submitScore',
  async (scoreData, { rejectWithValue }) => {
    try {
      const response = await quizAPI.submitScore(scoreData);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to submit score');
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  'quiz/fetchLeaderboard',
  async ({ category, difficulty }, { rejectWithValue }) => {
    try {
      const leaderboard = await quizAPI.getLeaderboard(category, difficulty);
      return leaderboard;
    } catch (error) {
      return rejectWithValue('Failed to fetch leaderboard');
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setSelectedAnswer: (state, action) => {
      state.selectedAnswer = action.payload;
      if (action.payload !== null) {
        state.answers[state.currentQuestionIndex] = action.payload;
      }
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setIsConfiguring: (state, action) => {
      state.isConfiguring = action.payload;
    },
    setQuizComplete: (state, action) => {
      state.quizComplete = action.payload;
    },
    setShowLeaderboard: (state, action) => {
      state.showLeaderboard = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedDifficulty: (state, action) => {
      state.selectedDifficulty = action.payload;
    },
    setIsOffline: (state, action) => {
      state.isOffline = action.payload;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    resetQuiz: (state) => {
      return {
        ...initialState,
        username: state.username,
        selectedCategory: state.selectedCategory,
        selectedDifficulty: state.selectedDifficulty,
      };
    },
  },
  extraReducers: (builder) => {
    // Handle fetchQuestions
    builder.addCase(fetchQuestions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
      state.error = null;
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ;
    });

    // Handle submitScore
    builder.addCase(submitScore.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(submitScore.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(submitScore.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle fetchLeaderboard
    builder.addCase(fetchLeaderboard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.leaderboard = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLeaderboard.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  setUsername,
  setSelectedAnswer,
  setCurrentQuestionIndex,
  setTimeLeft,
  setIsConfiguring,
  setQuizComplete,
  setShowLeaderboard,
  setSelectedCategory,
  setSelectedDifficulty,
  setIsOffline,
  incrementScore,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;