const QUIZ_CONFIG = {
  introPages: [
    {
      type: "cover",
      bg: "",
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
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" },
        { text: "C", result: "C" }
      ]
    },
    {
      bg: "static/4.png",
      answers: [
        { text: "A", result: "A" },
        { text: "B", result: "B" },
        { text: "C", result: "C" }
      ]
    }
  ],
  results: {
    "A": {
      bg: "static/5.png",
      btn: { label: "Finish", action: "thankYou" }
    },
    "B": {
      bg: "static/5.png",
      btn: { label: "Finish", action: "thankYou" }
    },
    "C": {
      bg: "static/5.png",
      btn: { label: "Finish", action: "thankYou" }
    }
  },
  thankYou: {
    bg: "static/6.png"
  }
};
