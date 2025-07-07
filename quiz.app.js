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

  // COVER PAGE
  if (pageIdx === 0) {
    const p = QUIZ_CONFIG.introPages[0];
    renderCoverPage(p);
    return;
  }

  // INFO PAGE
  if (pageIdx === 1) {
    const p = QUIZ_CONFIG.introPages[1];
    renderBgScrollPage({
      bg: p.bg,
      content: `
        <div class="content-spacer"></div>
        <div class="scroll-bottom">
          <button class="main-btn" id="mainBtn">${p.btn.label}</button>
        </div>
        <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>
      `
    });
    $("#mainBtn").onclick = () => {
      state.page++;
      state.quizStarted = true;
      render();
    };
    setupBackBtn();
    return;
  }

  // QUESTION PAGES
  if (state.quizStarted && pageIdx - totalIntro < totalQ) {
    const qIdx = pageIdx - totalIntro;
    const q = QUIZ_CONFIG.questions[qIdx];
    renderQuestionPage(q, qIdx);
    return;
  }

  // GET RESULTS PAGE
  if (state.quizStarted && state.showGetResults) {
    const getRes = QUIZ_CONFIG.getResults;
    renderBgScrollPage({
      bg: getRes.bg,
      content: `
        <div class="content-spacer"></div>
        <div class="scroll-bottom">
          <button class="main-btn" id="getResultsBtn">${getRes.btn.label}</button>
        </div>
        <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>
      `
    });
    $("#getResultsBtn").onclick = () => {
      state.showGetResults = false;
      state.showResult = true;
      render();
    };
    setupBackBtn();
    return;
  }

  // RESULT PAGE
  if (state.quizStarted && state.showResult && !state.completed) {
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
    renderBgScrollPage({
      bg: res.bg,
      content: `
        <div class="result-vertical">
          <div class="result-text">${res.resultText || ""}</div>
        </div>
        <div class="scroll-bottom">
          <button class="main-btn" id="finishBtn">${res.btn.label}</button>
        </div>
        <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>
      `
    });
    $("#finishBtn").onclick = () => {
      state.completed = true;
      state.page++;
      render();
    };
    setupBackBtn();
    return;
  }

  // THANK YOU PAGE
  if (state.completed) {
    const t = QUIZ_CONFIG.thankYou;
    renderBgScrollPage({
      bg: t.bg,
      content: `<div class="content-spacer"></div>
        <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>`
    });
    setupBackBtn();
  }
}

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

function renderBgScrollPage({ bg, content }) {
  app.innerHTML = `
    <div class="scroll-bg" style="background-image:url('${bg}');"></div>
    <div class="scroll-contents">
      ${content}
    </div>
  `;
}

function renderQuestionPage(q, qIdx) {
  let selected = state.answers[qIdx] !== undefined
    ? q.answers.findIndex(a => a.result === state.answers[qIdx])
    : null;

  app.innerHTML = `
    <div class="scroll-bg" style="background-image:url('${q.bg}');"></div>
    <div class="scroll-contents">
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
      <div class="scroll-bottom">
        <button class="main-btn" id="nextQuestionBtn" type="button" ${selected === null ? "disabled" : ""}>Next</button>
      </div>
      <button class="back-btn bottom" id="backBtn" title="Go Back">&#8592;</button>
    </div>
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

function setupBackBtn() {
  const btn = $("#backBtn");
  if (!btn) return;
  btn.onclick = () => {
    const totalIntro = QUIZ_CONFIG.introPages.length;
    if (state.page > 0) {
      if (
        state.quizStarted &&
        state.page <= totalIntro + QUIZ_CONFIG.questions.length &&
        state.page > totalIntro
      ) {
        state.answers.pop();
      }
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
