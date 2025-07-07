const $ = (sel) => document.querySelector(sel);
const app = $("#app");

let state = {
  page: 0,
  answers: [],
  quizStarted: false,
  showResult: false,
  completed: false,
  resultKey: null
};

function render() {
  app.innerHTML = "";
  let pageIdx = state.page;
  const totalIntro = QUIZ_CONFIG.introPages.length;
  const totalQ = QUIZ_CONFIG.questions.length;
  const totalPages = totalIntro + totalQ + 2; // +2 for result and thank you

  // COVER PAGE (card style, no back)
  if (pageIdx === 0) {
    const p = QUIZ_CONFIG.introPages[0];
    renderCardImageCover(p);
    return;
  }

  // INFO PAGE: full screen, button at bottom center, back at top left
  if (pageIdx === 1) {
    const p = QUIZ_CONFIG.introPages[1];
    renderFullscreenPage({
      bg: p.bg,
      centerContent: "",
      bottomContent: p.btn
        ? `<button class="main-btn" id="mainBtn">${p.btn.label}</button>`
        : "",
      showBack: true
    });
    if (p.btn) $("#mainBtn").onclick = () => {
      state.page++;
      state.quizStarted = true;
      render();
    };
    return;
  }

  // QUESTION PAGES: full screen, quiz answer buttons centered, back at top left
  if (state.quizStarted && pageIdx - totalIntro < totalQ) {
    const qIdx = pageIdx - totalIntro;
    const q = QUIZ_CONFIG.questions[qIdx];
    let answersHtml = q.answers
      .map(
        (a, i) => `<button class="answer-btn" data-idx="${i}">${a.text}</button>`
      )
      .join("");
    renderFullscreenPage({
      bg: q.bg,
      centerContent: `<div class="answers">${answersHtml}</div>`,
      bottomContent: "",
      showBack: true
    });
    document.querySelectorAll(".answer-btn").forEach((btn, i) => {
      btn.onclick = () => {
        state.answers.push(q.answers[i].result);
        state.page++;
        render();
      };
    });
    return;
  }

  // RESULT PAGE: full screen, button at bottom center, back at top left
  if (state.quizStarted && !state.completed && state.showResult) {
    const tally = {};
    state.answers.forEach(ans => {
      tally[ans] = (tally[ans] || 0) + 1;
    });
    let top = Object.keys(tally).reduce(
      (a, b) => (tally[a] >= tally[b] ? a : b)
    );
    state.resultKey = top;
    const result = QUIZ_CONFIG.results[top] || {};
    renderFullscreenPage({
      bg: result.bg,
      centerContent: "",
      bottomContent: result.btn
        ? `<button class="main-btn" id="finishBtn">${result.btn.label}</button>`
        : "",
      showBack: true
    });
    if (result.btn) $("#finishBtn").onclick = () => {
      state.completed = true;
      state.page++;
      render();
    };
    return;
  }

  // ADVANCE TO RESULT PAGE
  if (
    state.quizStarted &&
    pageIdx - totalIntro === totalQ &&
    !state.showResult
  ) {
    state.showResult = true;
    render();
    return;
  }

  // THANK YOU PAGE: full screen, no button, back at top left
  if (state.completed) {
    const t = QUIZ_CONFIG.thankYou;
    renderFullscreenPage({ bg: t.bg, centerContent: "", bottomContent: "", showBack: true });
  }
}

// Cover: image in card, button below
function renderCardImageCover(p) {
  app.innerHTML = `
    <div class="cover-wrapper">
      <img class="cover-img" src="${p.img}" alt="cover"/>
      ${p.btn ? `<button class="main-btn" id="nextBtn">${p.btn.label}</button>` : ""}
    </div>
  `;
  if (p.btn) $("#nextBtn").onclick = () => {
    state.page++;
    render();
  };
}

// Fullscreen image, center or bottom content, optional back button
function renderFullscreenPage({ bg, centerContent, bottomContent, showBack }) {
  app.innerHTML = `
    <div class="fullscreen-bg" style="background-image:url('${bg}');"></div>
    ${showBack ? `<button class="back-btn" id="backBtn" title="Go Back">&#8592;</button>` : ""}
    <div class="fullscreen-center">${centerContent || ""}</div>
    <div class="fullscreen-bottom">${bottomContent || ""}</div>
  `;
  if (showBack) {
    $("#backBtn").onclick = () => {
      // Only allow going back if not on first page
      if (state.page > 0) {
        // Go back to previous page and remove last answer if coming from a question page
        if (state.quizStarted && state.page <= QUIZ_CONFIG.introPages.length + QUIZ_CONFIG.questions.length && state.page > QUIZ_CONFIG.introPages.length) {
          state.answers.pop();
        }
        // Reset result/thank you state if backing up from those pages
        if (state.showResult && !state.completed) {
          state.showResult = false;
        }
        if (state.completed) {
          state.completed = false;
          state.showResult = true;
        }
        state.page--;
        render();
      }
    };
  }
}

render();
