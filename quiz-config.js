const QUIZ_CONFIG = {
  introPages: [
    {
      type: "cover",
      bg: "static/1.png",
      logo: "",
      title: "",
      desc: "",
      img: ""
    },
    {
      type: "info",
      bg: "static/2.png",
      logo: "",
      title: "",
      desc: "",
      img: ""
    }
  ],
  questions: [
    {
      bg: "static/3.png",
      logo: "",
      img: "",
      question: "Which best describes your approach?",
      answers: [
        { text: "A - Analytical", result: "A" },
        { text: "B - Bold", result: "B" },
        { text: "C - Creative", result: "C" }
      ]
    },
    {
      bg: "static/3.png",
      logo: "",
      img: "",
      question: "What motivates you most?",
      answers: [
        { text: "A - Achievement", result: "A" },
        { text: "B - Adventure", result: "B" },
        { text: "C - Collaboration", result: "C" }
      ]
    }
    // Add more questions using static/3.png as needed
  ],
  endPrompt: {
    bg: "static/4.png",
    logo: "",
    title: "",
    desc: "",
    btn: {
      label: "Get Your Results",
      action: "showResults"
    }
  },
  results: {
    "A": {
      title: "You are Analytical!",
      desc: "You excel at breaking down problems and finding logical solutions.",
      img: "static/5.png",
      btn: {
        label: "Continue",
        action: "thankYou"
      }
    },
    "B": {
      title: "You are Bold!",
      desc: "You love to take risks and lead the way.",
      img: "static/5.png",
      btn: {
        label: "Continue",
        action: "thankYou"
      }
    },
    "C": {
      title: "You are Creative!",
      desc: "You think outside the box and inspire others with your ideas.",
      img: "static/5.png",
      btn: {
        label: "Continue",
        action: "thankYou"
      }
    }
    // Add D, E as needed with the same structure
  },
  thankYou: {
    bg: "static/6.png",
    logo: "",
    title: "Thank YOU!!",
    desc: "Think it. Do it. Own it!",
    cta: {
      label: "Go Here!!",
      url: "https://your-link.com"
    },
    img: ""
  }
};
