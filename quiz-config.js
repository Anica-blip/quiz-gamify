const QUIZ_CONFIG = {
  introPages: [
    {
      type: "cover",
      img: "static/1.png",
      btn: { label: "Enter", action: "next" }
    },
    {
      type: "info",
      bg: "static/2.png",
      btn: { label: "Start Quiz", action: "next" }
    }
  ],
  questions: [
    {
      bg: "static/3.png",
      question: "Which best describes your approach?",
      answers: [
        { text: "Analytical", result: "A" },
        { text: "Bold", result: "B" },
        { text: "Creative", result: "C" }
      ]
    },
    {
      bg: "static/3.png",
      question: "What motivates you most?",
      answers: [
        { text: "Achievement", result: "A" },
        { text: "Adventure", result: "B" },
        { text: "Collaboration", result: "C" }
      ]
    }
  ],
  getResults: {
    bg: "static/4.png", // Results background for "Get Results" button page
    btn: { label: "Get Your Results", action: "showResult" }
  },
  resultPages: {
    "A": {
      bg: "static/4.png", // Results background
      resultText: "You are Analytical!",
      btn: { label: "Finish", action: "thankYou" }
    },
    "B": {
      bg: "static/4.png",
      resultText: "You are Bold!",
      btn: { label: "Finish", action: "thankYou" }
    },
    "C": {
      bg: "static/4.png",
      resultText: "You are Creative!",
      btn: { label: "Finish", action: "thankYou" }
    }
  },
  thankYou: {
    bg: "static/6.png"
  }
};
