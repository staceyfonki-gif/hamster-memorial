// --- Get buttons ---
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

// --- Get counters ---
const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// --- Load saved values or start at 0 ---
let hearts = localStorage.getItem("hearts") || 0;
let loves = localStorage.getItem("loves") || 0;
let candles = localStorage.getItem("candles") || 0;

// --- Display initial values ---
heartCount.textContent = hearts;
loveCount.textContent = loves;
candleCount.textContent = candles;

// --- Event listeners ---
heartBtn.addEventListener("click", function () {
  hearts++;
  heartCount.textContent = hearts;
  localStorage.setItem("hearts", hearts);
});

loveBtn.addEventListener("click", function () {
  loves++;
  loveCount.textContent = loves;
  localStorage.setItem("loves", loves);
});

candleBtn.addEventListener("click", function () {
  candles++;
  candleCount.textContent = candles;
  localStorage.setItem("candles", candles);
});