// --- Button elements ---
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

// --- Counter display elements ---
const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// --- CountAPI namespace and keys ---
const namespace = "hamster_memorial_stacey"; // your unique site namespace
const keys = {
  heart: "💖",
  love: "🤍",
  candle: "🕯"
};

// --- Format numbers into k/M ---
function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
  return value;
}

// --- Ensure key exists (create if not) ---
function ensureKeyExists(key) {
  return fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
    .then(res => res.json())
    .catch(() => {
      // Key doesn't exist, create it with value 0
      return fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=0`)
        .then(res => res.json());
    });
}

// --- Load current count ---
function loadCount(key, element) {
  ensureKeyExists(key)
    .then(() => {
      fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
        .then(res => res.json())
        .then(data => {
          element.textContent = formatNumber(data.value || 0);
        });
    });
}

// --- Increment count and show pop animation ---
function incrementCount(key, element, btn) {
  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = formatNumber(data.value);
      btn.setAttribute('data-emoji', keys[key]);
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 600);
    })
    .catch(() => console.error("Error incrementing count"));
}

// --- Load initial counts for all buttons ---
loadCount("heart", heartCount);
loadCount("love", loveCount);
loadCount("candle", candleCount);

// --- Event listeners ---
heartBtn.addEventListener("click", () => incrementCount("heart", heartCount, heartBtn));
loveBtn.addEventListener("click", () => incrementCount("love", loveCount, loveBtn));
candleBtn.addEventListener("click", () => incrementCount("candle", candleCount, candleBtn));