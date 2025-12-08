let homeButtons = document.querySelectorAll(".home-wrapper button");
let guestButtons = document.querySelectorAll(".guest-wrapper button");
let restartBtn = document.getElementById("restart-btn");

let homeScoreEl = document.querySelector(".home-wrapper .score-panel p");
let guestScoreEl = document.querySelector(".guest-wrapper .score-panel p");

let homeScore = 0;
let guestScore = 0;
let points = "";

function updateScore(points, team) {
  if (team === "home") {
    homeScore += Number(points);
    if (homeScore < 10) {
      homeScoreEl.textContent = "0" + homeScore;
    } else {
      homeScoreEl.textContent = homeScore;
    }
  } else {
    guestScore += Number(points);
    if (guestScore < 10) {
      guestScoreEl.textContent = "0" + guestScore;
    } else {
      guestScoreEl.textContent = guestScore;
    }
  }
}

function buttonConfig() {
  homeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      points = button.textContent.slice(1);
      updateScore(points, "home");
    });
  });

  guestButtons.forEach((button) => {
    button.addEventListener("click", () => {
      points = button.textContent.slice(1);
      updateScore(points, "guest");
    });
  });

  restartBtn.addEventListener("click", () => {
    homeScore = 0;
    guestScore = 0;
    homeScoreEl.textContent = "00";
    guestScoreEl.textContent = "00";
  });
}

buttonConfig();
