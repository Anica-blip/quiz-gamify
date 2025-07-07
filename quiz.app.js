// === QUIZ APP LOGIC ===
// Renders the quiz using the config above, with explicit step for "Get Your Results" and
// a button on results page to reach the final Thank You page.

const $ = (sel) => document.querySelector(sel);
const app = $("#app");

let state = {
  page: 0, // index in introPages + questions + (endPrompt) + results + thankyou
  answers: [],
  quizStarted: false,
  showEndPrompt: false,
  showResult: false,
  completed: false,
  resultKey: null
};

function render() {
  app.innerHTML = "";
  let pageIdx = state.page;
  const totalIntro = QUIZ_CONFIG.introPages.length;
  const totalQ = QUIZ_CONFIG.questions.length;

  // --- Cover/Intro Pages ---
  if (!state.quizStarted && pageIdx < totalIntro) {
    const p = QUIZ_CONFIG.introPages[pageIdx];
    renderPage({
      bg: p.bg,
      logo: p.logo,
      img: p.img,
      title: p.title,
      desc: p.desc,
      btn: {
        text: pageIdx === totalIntro - 1 ? "Start Quiz" : "Next",
        action: () => {
          state.page++;
          if (state.page === totalIntro) state.quizStarted = true;
          render();
        }
      }
    });
    return;
  }

  // --- Quiz Questions ---
  if (state.quizStarted && pageIdx - totalIntro < totalQ) {
    const qIdx = pageIdx - totalIntro;
    const q = QUIZ_CONFIG.questions[qIdx];
    renderQuestion(q, qIdx);
    return;
  }

  // --- End Prompt ("Get Your Results") ---
  if (
    state.quizStarted &&
    !state.showEndPrompt &&
    pageIdx - totalIntro === totalQ
  ) {
    state.showEndPrompt = true; // Prevents multiple entry
    const ep = QUIZ_CONFIG.endPrompt;
    renderPage({
      bg: ep.bg,
      logo: ep.logo,
      img: ep.img,
      title: ep.title,
      desc: ep.desc,
      btn: {
        text: ep.btn?.label || "Get Your Results",
        action: () => {
          state.showResult = true;
          render();
        }
      }
    });
    return;
  }

  // --- Results Page ---
  if (
    state.quizStarted &&
    state.showResult &&
    !state.completed &&
    pageIdx - totalIntro === totalQ
  ) {
    // Calculate score/result
    const tally = {};
    state.answers.forEach(ans => {
      tally[ans] = (tally[ans] || 0) + 1;
    });
    let top = Object.keys(tally).reduce(
      (a, b) => (tally[a] >= tally[b] ? a : b)
    );
    state.resultKey = top;
    const result = QUIZ_CONFIG.results[top] || {
      title: "Result",
      desc: "Try again!",
      img: ""
    };
    renderPage({
      bg: result.bg || "5.png",
      logo: result.logo || "",
      img: result.img || "5.png",
      title: result.title,
      desc: result.desc,
      btn: {
        text: result.btn?.label || "Continue",
        action: () => {
          state.completed = true;
          state.page++;
          render();
        }
      }
    });
    return;
  }

  // --- Thank You Page ---
  if (state.completed) {
    const t = QUIZ_CONFIG.thankYou;
    renderPage({
      bg: t.bg,
      logo: t.logo,
      img: t.img,
      title: t.title,
      desc: t.desc,
      btn: t

