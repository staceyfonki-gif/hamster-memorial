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

// --- Function to get initial value from CountAPI ---
function loadCount(key, element) {
  fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => { element.textContent = data.value || 0; })
    .catch(() => { element.textContent = 0; });
}

// --- Load initial counts ---
loadCount(heartKey, heartCount);
loadCount(loveKey, loveCount);
loadCount(candleKey, candleCount);

// --- Function to increment count and show tiny pop ---
function incrementCount(key, element, btn, emoji='💖') {
  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = data.value;
      // Trigger pop animation
      btn.classList.add('clicked');
      btn.setAttribute('data-emoji', emoji);
      setTimeout(() => btn.classList.remove('clicked'), 600);
    });
}

// --- Event listeners ---
heartBtn.addEventListener("click", () => incrementCount(heartKey, heartCount, heartBtn, '💖'));
loveBtn.addEventListener("click", () => incrementCount(loveKey, loveCount, loveBtn, '🤍'));
candleBtn.addEventListener("click", () => incrementCount(candleKey, candleCount, candleBtn, '🕯'));