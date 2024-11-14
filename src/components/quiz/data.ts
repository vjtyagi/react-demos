export interface QuestionType {
  id: number;
  marks: number;
  text: string;
  options: Option[];
  answer: Option[];
}
export interface Option {
  text: string;
}
export interface Response {
  question: QuestionType;
  answers: Option[];
}
export interface Quiz {
  questions: QuestionType[];
}
export const quiz: Quiz = {
  questions: [
    {
      id: 1,
      marks: 5,
      text: "What is the capital of France?",
      options: [
        { text: "Berlin" },
        { text: "Madrid" },
        { text: "Paris" },
        { text: "Rome" },
      ],
      answer: [{ text: "Paris" }],
    },
    {
      id: 2,
      marks: 5,
      text: "What is 2 + 2?",
      options: [{ text: "3" }, { text: "4" }, { text: "5" }, { text: "6" }],
      answer: [{ text: "4" }],
    },
    {
      id: 3,
      marks: 10,
      text: "What is the largest planet in our Solar System?",
      options: [
        { text: "Earth" },
        { text: "Mars" },
        { text: "Jupiter" },
        { text: "Saturn" },
      ],
      answer: [{ text: "Jupiter" }],
    },
    {
      id: 4,
      marks: 10,
      text: "Who wrote 'Hamlet'?",
      options: [
        { text: "Charles Dickens" },
        { text: "J.K. Rowling" },
        { text: "William Shakespeare" },
        { text: "Mark Twain" },
      ],
      answer: [{ text: "William Shakespeare" }],
    },
    {
      id: 5,
      marks: 5,
      text: "What is the boiling point of water at sea level (in Celsius)?",
      options: [
        { text: "50°C" },
        { text: "100°C" },
        { text: "150°C" },
        { text: "200°C" },
      ],
      answer: [{ text: "100°C" }],
    },
  ],
};
