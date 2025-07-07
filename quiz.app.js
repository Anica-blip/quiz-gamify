const $ = (sel) => document.querySelector(sel);
const app = $("#app");

let state = {
  page: 0,
  answers: [],
  quizStarted: false,
  showGetResults: false,
  showResult: false,
  completed: false,
  resultKey: null
};

function render() {
  app.innerHTML = "";
  let pageIdx = state.page;
  const totalIntro = QUIZ_CONFIG.introPages.length;
  const totalQ = QUIZ_CONFIG.questions.length;

  // COVER PAGE (card style, scrollable if needed)
  if (pageIdx === 0) {
    const p = QUIZ_CONFIG.introPages[0];
    renderCoverPage(p);
    return;
  }

  // INFO PAGE: full background, button at bottom, back button bottom left
  if (pageIdx === 1) {
    const p = QUIZ_CONFIG.introPages[1];
    renderFullscreenBgPage({
      bg: p.bg,
      button: p.btn ? { label: p.btn.label, id: "mainBtn", onClick: () => {
        state.page++;
        state.quizStarted = true;
        render();
      }} : null,
      showBack: true
    });
    return;
  }

  // QUESTION PAGES: background, question text and transparent answer buttons, next & back
  if (state.quizStarted && pageIdx - totalIntro < totalQ) {
    const qIdx = pageIdx - totalIntro;
    const q = QUIZ_CONFIG.questions[qIdx];
    renderQuestionPage(q, qIdx);
    return;
  }

  // GET RESULTS PAGE: after final question, before result is shown
  if (state.quizStarted && state.showGetResults) {
    const getRes = QUIZ_CONFIG.getResults;
    renderFullscreenBgPage({
      bg: getRes.bg,
      button: getRes.btn ? {
        label: getRes.btn.label,
        id: "getResultsBtn",
        onClick: () => {
          state.showGetResults = false;
          state.showResult = true;
          render();
        }
      } : null,
      showBack: true
    });
    return;
  }

  // RESULT PAGE: background, result text, button at bottom, back button bottom left
  if (state.quizStarted && state.showResult && !state.completed) {
    // Calculate resultKey if not yet set
    if (!state.resultKey) {
      const tally = {};
      state.answers.forEach(ans => {
        tally[ans] = (tally[ans] || 0) + 1;
      });
      let top = Object.keys(tally).reduce(
        (a, b) => (tally[a] >= tally[b] ? a : b)
      );
      state.resultKey = top;
    }
    const res = QUIZ_CONFIG.resultPages[state.resultKey] || {};
    renderResultPage(res);
    return;
  }

  // THANK YOU PAGE: background, back at bottom left
  if (state.completed) {
    const t = QUIZ_CONFIG.thankYou;
    renderFullscreenBgPage({ bg: t.bg, button: null, showBack: true });
  }
}

// Cover: card style, scrollable
function renderCoverPage(p) {
  app.innerHTML = `
    <div class="cover-outer">
      <div class="cover-wrapper">
        <img class="cover-img" src="${p.img}" alt="cover"/>
      </div>
      ${p.btn ? `<button class="main-btn" id="nextBtn">${p.btn.label}</button>` : ""}
    </div>
  `;
  if (p.btn) $("#nextBtn").onclick = () => {
    state.page++;
    render();
  };
}

// Info, get results, thank you: full background, button at bottom, back at bottom left if needed
function renderFullscreenBgPage({ bg, button, showBack }) {
  app.innerHTML = `
    <div class="fullscreen-bg" style="background-image:url('${bg}');"></div>
    ${showBack ? `<button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>` : ""}
    ${button ? `<div class="fullscreen-bottom"><button class="main-btn" id="${button.id}">${button.label}</button></div>` : ""}
  `;
  if (button) $("#" + button.id).onclick = button.onClick;
  if (showBack) setupBackBtn();
}

// Questions: background, question text and transparent answer buttons, next & back at bottom left
function renderQuestionPage(q, qIdx) {
  // Restore previously selected answer if navigating back
  let selected = state.answers[qIdx] !== undefined
    ? q.answers.findIndex(a => a.result === state.answers[qIdx])
    : null;

  app.innerHTML = `
    <div class="fullscreen-bg" style="background-image:url('${q.bg}');"></div>
    <div class="question-vertical">
      <div class="question-text">${q.question || ""}</div>
      <form id="questionForm" autocomplete="off" class="answers-form">
        <div class="answers">
          ${q.answers.map((a, i) =>
            `<button type="button" class="answer-btn${selected === i ? " selected" : ""}" data-idx="${i}">${a.text}</button>`
          ).join("")}
        </div>
      </form>
    </div>
    <div class="fullscreen-bottom"><button class="main-btn" id="nextQuestionBtn" type="button" ${selected === null ? "disabled" : ""}>Next</button></div>
    <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>
  `;

  let currentSelected = selected;
  const answerBtns = document.querySelectorAll('.answer-btn');
  const nextBtn = $("#nextQuestionBtn");

  answerBtns.forEach((btn, i) => {
    btn.onclick = () => {
      answerBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      currentSelected = i;
      nextBtn.disabled = false;
    };
  });

  nextBtn.onclick = () => {
    if (currentSelected !== null) {
      state.answers[qIdx] = q.answers[currentSelected].result;
      // If last question, go to get results page, otherwise next question
      if (qIdx === QUIZ_CONFIG.questions.length - 1) {
        state.showGetResults = true;
        state.page++;
      } else {
        state.page++;
      }
      render();
    }
  };

  setupBackBtn();
}

// Result page: show result text, button at bottom, back at bottom left
function renderResultPage(res) {
  app.innerHTML = `
    <div class="fullscreen-bg" style="background-image:url('${res.bg}');"></div>
    <div class="result-vertical">
      <div class="result-text">${res.resultText || ""}</div>
    </div>
    <div class="fullscreen-bottom"><button class="main-btn" id="finishBtn">${res.btn.label}</button></div>
    <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>
  `;
  $("#finishBtn").onclick = () => {
    state.completed = true;
    state.page++;
    render();
  };
  setupBackBtn();
}

// Back Button for all but cover
function setupBackBtn() {
  const btn = $("#backBtn");
  if (!btn) return;
  btn.onclick = () => {
    const totalIntro = QUIZ_CONFIG.introPages.length;
    if (state.page > 0) {
      // Remove last answer if coming from a question page
      if (
        state.quizStarted &&
        state.page <= totalIntro + QUIZ_CONFIG.questions.length &&
        state.page > totalIntro
      ) {
        state.answers.pop();
      }
      // Reset result/thank you state if backing up from those pages
      if (state.showResult && !state.completed) {
        state.showResult = false;
        state.resultKey = null;
      }
      if (state.completed) {
        state.completed = false;
        state.showResult = true;
      }
      if (state.showGetResults) {
        state.showGetResults = false;
      }
      state.page--;
      render();
    }
  };
}

render();
