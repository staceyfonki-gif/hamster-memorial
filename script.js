// --- Button elements ---
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

// --- Counter display elements ---
const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// --- CountAPI namespace and keys (unique for your site) ---
const namespace = "nathietribute"; // change if you want something else
const heartKey = "heart";
const loveKey = "love";
const candleKey = "candle";

// --- Function to get initial value from CountAPI ---
function loadCount(key, element) {
  fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = data.value || 0;
    })
    .catch(() => {
      element.textContent = 0; // fallback if API fails
    });
}

// --- Load initial counts ---
loadCount(heartKey, heartCount);
loadCount(loveKey, loveCount);
loadCount(candleKey, candleCount);

// --- Function to increment count in CountAPI ---
function incrementCount(key, element) {
  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = data.value;
    })
    .catch(() => {
      console.error("Error incrementing count");
    });
}

// --- Event listeners for buttons ---
heartBtn.addEventListener("click", () => incrementCount(heartKey, heartCount));
loveBtn.addEventListener("click", () => incrementCount(loveKey, loveCount));
candleBtn.addEventListener("click", () => incrementCount(candleKey, candleCount));