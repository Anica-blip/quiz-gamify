// === QUIZ CONFIG ===
// Just update this file to make a new quiz!

const QUIZ_CONFIG = {
  // Pages before quiz questions
  introPages: [
    {
      type: "cover",
      bg: "cover.jpg", // background image file (public/)
      logo: "aurion-logo.png", // logo file (optional)
      // You can add title/description if you want text overlays, or leave blank if using Canva images as is
      title: "QUIZ TIME",
      desc: "",
      img: "mascot.png" // mascot or character image (optional)
    },
    {
      type: "info",
      bg: "intro.jpg",
      logo: "choices-logo.png",
      title: "",
      desc: "",
      img: "" // can be blank if not needed
    }
  ],

  // Quiz Questions
  questions: [
    {
      bg: "question-bg.jpg", // question background (optional)
      logo: "choices-logo.png",
      img: "mascot2.png", // optional image for question
      question: "Which best describes your approach?",
      answers: [
        { text: "A - Analytical", result: "A" },
        { text: "B - Bold", result: "B" },
        { text: "C - Creative", result: "C" },
        { text: "D - Driven", result: "D" }
      ]
    },
    {
      bg: "question-bg.jpg",
      logo: "choices-logo.png",
      img: "mascot2.png",
      question: "What motivates you the most?",
      answers: [
        { text: "A - Achievement", result: "A" },
        { text: "B - Adventure", result: "B" },
        { text: "C - Collaboration", result: "C" }
      ]
    }
    // Add more questions here; each can have 3–5 answers
  ],

  // Results, mapped by result letter
  results: {
    "A": {
      title: "You are Analytical!",
      desc: "You excel at breaking down problems and finding logical solutions.",
      img: "result-a.png"
    },
    "B": {
      title: "You are Bold!",
      desc: "You love to take risks and lead the way.",
      img: "result-b.png"
    },
    "C": {
      title: "You are Creative!",
      desc: "You think outside the box and inspire others with your ideas.",
      img: "result-c.png"
    },
    "D": {
      title: "You are Driven!",
      desc: "You are focused and determined to succeed.",
      img: "result-d.png"
    }
    // Add E if you want 5-answer quizzes!
  },

  // Thank you / CTA page
  thankYou: {
    bg: "thankyou.jpg",
    logo: "choices-logo.png",
    title: "Thank YOU!!",
    desc: "Think it. Do it. Own it!",
    cta: {
      label: "Go Here!!",
      url: "https://your-call-to-action-link"
    },
    img: "thankyou-mascot.png"
  }
};
