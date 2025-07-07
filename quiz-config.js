const QUIZ_CONFIG = {
  introPages: [
    {
      type: "cover",
      bg: "",
      img: "static/1.png", // Page 1: Cover image
      btn: { label: "Enter", action: "next" }
    },
    {
      type: "info",
      bg: "static/2.png", // Page 2: How it works (full background)
      btn: { label: "Start Quiz", action: "next" }
    }
  ],
  questions: [
    {
      bg: "static/3.png", // Page 3: Question 1
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" },
        { text: "C", result: "C" }
      ]
    },
    {
      bg: "static/4.png", // Page 4: Question 2
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" },
        { text: "C", result: "C" }
      ]
    }
  ],
  results: {
    "A": {
      bg: "static/5.png", // Page 5: Result A
      btn: { label: "Finish", action: "thankYou" }
    },
    "B": {
      bg: "static/5.png", // Page 5: Result B (using same image as A; change if needed)
      btn: { label: "Finish", action: "thankYou" }
    },
    "C": {
      bg: "static/5.png", // Page 5: Result C (using same image as A; change if needed)
      btn: { label: "Finish", action: "thankYou" }
    }
  },
  thankYou: {
    bg: "static/6.png" // Page 6: Thank you
  }
};
