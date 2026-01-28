// ---------- Elements ----------
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// ---------- JSONBin setup ----------
const BIN_ID = "6976522943b1c97be9494cf6"; 
const API_KEY = "$2a$10$fkCw.4DkTMF97IL9PiySzOjUI5H/6WvgXv4Zsx3siFPJnLb.odTVi"; 
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// ---------- Emoji mapping ----------
const EMOJIS = { heart: "💖", love: "🤍", candle: "🕯" };

// ---------- Helper to format numbers ----------
function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
  return value;
}

// ---------- Load counts ----------
async function loadCounts() {
  try {
    const res = await fetch(BIN_URL, {
      headers: { "X-Master-Key": API_KEY }
    });
    const data = await res.json();
    heartCount.textContent = formatNumber(data.record.heart);
    loveCount.textContent = formatNumber(data.record.love);
    candleCount.textContent = formatNumber(data.record.candle);
  } catch (err) {
    console.error("Failed to load counts:", err);
  }
}

// ---------- Increment counts ----------
async function incrementCounter(type) {
  try {
    // Get current counts
    const res = await fetch(BIN_URL, { headers: { "X-Master-Key": API_KEY } });
    const data = await res.json();
    const counts = data.record;

    // Increment
    counts[type] += 1;

    // Update the bin
    await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY
      },
      body: JSON.stringify(counts)
    });

    // Update display
    if (type === "heart") heartCount.textContent = formatNumber(counts.heart);
    if (type === "love") loveCount.textContent = formatNumber(counts.love);
    if (type === "candle") candleCount.textContent = formatNumber(counts.candle);

    // Pop animation
    const btnMap = { heart: heartBtn, love: loveBtn, candle: candleBtn };
    const btn = btnMap[type];
    btn.setAttribute('data-emoji', EMOJIS[type]);
    btn.classList.add('clicked');
    setTimeout(() => btn.classList.remove('clicked'), 600);

  } catch (err) {
    console.error("Error updating count:", err);
  }
}

// ---------- Button listeners ----------
heartBtn.addEventListener("click", () => incrementCounter("heart"));
loveBtn.addEventListener("click", () => incrementCounter("love"));
candleBtn.addEventListener("click", () => incrementCounter("candle"));

// ---------- Initial load ----------
loadCounts();