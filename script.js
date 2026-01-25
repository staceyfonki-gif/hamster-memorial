// --- Button elements ---
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

// --- Counter display elements ---
const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// --- CountAPI namespace and keys ---
const namespace = "nathietribute"; // unique for your site
const heartKey = "heart";
const loveKey = "love";
const candleKey = "candle";

// --- Format numbers into k/M ---
function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
  return value;
}

// --- Load current count from CountAPI ---
function loadCount(key, element) {
  fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = formatNumber(data.value || 0);
    })
    .catch(() => {
      element.textContent = 0;
    });
}

// --- Load initial counts ---
loadCount(heartKey, heartCount);
loadCount(loveKey, loveCount);
loadCount(candleKey, candleCount);

// --- Increment count and show tiny pop animation ---
function incrementCount(key, element, btn, emoji) {
  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = formatNumber(data.value); // update live with formatting
      btn.setAttribute('data-emoji', emoji);
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 600);
    })
    .catch(() => console.error("Error incrementing count"));
}

// --- Event listeners for buttons ---
heartBtn.addEventListener("click", () => incrementCount(heartKey, heartCount, heartBtn, '💖'));
loveBtn.addEventListener("click", () => incrementCount(loveKey, loveCount, loveBtn, '🤍'));
candleBtn.addEventListener("click", () => incrementCount(candleKey, candleCount, candleBtn, '🕯'));