/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  feedback: string;
}

export interface GuessImage {
  id: number;
  imageUrl: string;
  answer: string;
  hint: string;
}

export interface Materi {
  id: number;
  title: string;
  content: string;
  icon: string;
}

export type Screen = 'login' | 'home' | 'materi' | 'quiz' | 'tebak-gambar' | 'score';
