const QUIZ_CONFIG = {
  introPages: [
    { type: "cover", bg: "1.png", logo: "", title: "", desc: "", img: "" },
    { type: "info",  bg: "2.png", logo: "", title: "", desc: "", img: "" }
  ],
  questions: [
    {
      bg: "3.png", logo: "", img: "",
      question: "Sample Question 1?",
      answers: [
        { text: "A - Option 1", result: "A" },
        { text: "B - Option 2", result: "B" }
      ]
    }
  ],
  endPrompt: {
    bg: "4.png", logo: "", title: "", desc: "",
    btn: { label: "Get Your Results", action: "showResults" }
  },
  results: {
    "A": { title: "Result A", desc: "You chose A!", img: "5.png" },
    "B": { title: "Result B", desc: "You chose B!", img: "5.png" }
  },
  thankYou: {
    bg: "6.png", logo: "", title: "Thank You!", desc: "Done!", cta: null, img: ""
  }
};
