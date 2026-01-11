export interface ImageData {
  id: string;
  path: string; // URL in our case
  is_slop: boolean;
}

export type GameState = 'intro' | 'playing' | 'feedback' | 'halftime' | 'finished';

export interface RoundResult {
  roundIndex: number;
  correct: boolean;
  scoreChange: number;
  message: string;
}

export interface FeedbackData {
  isCorrect: boolean;
  scoreChange: number;
  message: string;
}