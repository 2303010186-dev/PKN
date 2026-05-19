/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, GuessImage, Materi } from './types';

export const MATERI_LIST: Materi[] = [
  {
    id: 1,
    title: "Lambang Negara",
    content: "Indonesia memiliki lambang Garuda Pancasila. Di dadanya ada perisai dengan 5 lambang: Bintang, Rantai, Pohon Beringin, Kepala Banteng, serta Padi dan Kapas.",
    icon: "Shield"
  },
  {
    id: 2,
    title: "Bhinneka Tunggal Ika",
    content: "Meskipun kita berbeda suku (Sunda, Jawa, Bali, dll) dan agama, kita tetap satu bangsa Indonesia. Kita harus saling menghormati!",
    icon: "Users"
  },
  {
    id: 3,
    title: "Budaya Sunda",
    content: "Teman kita mengenakan baju adat Sunda. Alat musiknya Angklung yang terbuat dari bambu. Makanannya ada Nasi Liwet dan Lalapan!",
    icon: "Music"
  }
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Apa lambang sila pertama Pancasila?",
    options: ["Bintang", "Rantai", "Pohon Beringin", "Kepala Banteng"],
    correctAnswer: "Bintang",
    feedback: "Hebat! Bintang melambangkan Ketuhanan Yang Maha Esa."
  },
  {
    id: 2,
    question: "Bhinneka Tunggal Ika artinya apa?",
    options: ["Berbeda-beda tapi satu", "Sama saja", "Satu tujuan", "Pantang menyerah"],
    correctAnswer: "Berbeda-beda tapi satu",
    feedback: "Betul sekali! Indonesia kaya akan keragaman tapi tetap bersatu."
  },
  {
    id: 3,
    question: "Padi dan Kapas melambangkan apa?",
    options: ["Keadilan sosial", "Persatuan", "Kekuatan", "Keindahan"],
    correctAnswer: "Keadilan sosial",
    feedback: "Pintar! Padi dan Kapas adalah simbol kecukupan pangan dan sandang."
  }
];

export const GUESS_IMAGES: GuessImage[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1596701062351-be09000a68f0?q=80&w=400&h=300&fit=crop",
    answer: "Masjid",
    hint: "Tempat ibadah umat Islam yang berkubah indah."
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1548690312-e3b507d17a47?q=80&w=400&h=300&fit=crop",
    answer: "Gereja",
    hint: "Tempat ibadah umat Kristen dan Katolik."
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=400&h=300&fit=crop",
    answer: "Wayang",
    hint: "Boneka tradisional sering dimainkan dalang."
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=400&h=300&fit=crop",
    answer: "Pura",
    hint: "Tempat ibadah umat Hindu, banyak di Bali."
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1614757753738-403487f5471c?q=80&w=400&h=300&fit=crop",
    answer: "Klenteng",
    hint: "Tempat ibadah umat Konghucu berwarna merah."
  }
];
