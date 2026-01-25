// =====================
// BUTTON ELEMENTS
// =====================
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

// =====================
// DISPLAY ELEMENTS
// =====================
const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// =====================
// NAMESPACE & KEYS
// =====================
const namespace = "hamster_memorial_stacey"; // unique, safe string
const displayEmojis = { heart: "💖", love: "🤍", candle: "🕯" }; // for pop animation
const apiKeys = { heart: "heart", love: "love", candle: "candle" }; // safe for CountAPI

// =====================
// FORMAT NUMBERS (1k, 2.1k, 1M)
// =====================
function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
  return value;
}

// =====================
// ENSURE KEY EXISTS ON COUNTAPI
// =====================
async function ensureKeyExists(key) {
  try {
    const res = await fetch(`https://api.countapi.xyz/get/${namespace}/${apiKeys[key]}`);
    const data = await res.json();
    if (data.value !== undefined) return data.value;
  } catch (err) {
    console.log(`Key ${key} does not exist, creating...`);
  }

  // CREATE key with 0 if it doesn’t exist
  await fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${apiKeys[key]}&value=0`);
  return 0;
}

// =====================
// LOAD INITIAL COUNTS
// =====================
async function loadCounts() {
  heartCount.textContent = formatNumber(await ensureKeyExists("heart"));
  loveCount.textContent = formatNumber(await ensureKeyExists("love"));
  candleCount.textContent = formatNumber(await ensureKeyExists("candle"));
}

// =====================
// INCREMENT COUNTER
// =====================
async function incrementCounter(key, element, btn) {
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${apiKeys[key]}`);
    const data = await res.json();
    element.textContent = formatNumber(data.value);

    // Tiny pop animation
    btn.setAttribute("data-emoji", displayEmojis[key]);
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 600);
  } catch (err) {
    console.error("Error incrementing count:", err);
  }
}

// =====================
// ADD EVENT LISTENERS
// =====================
heartBtn.addEventListener("click", () => incrementCounter("heart", heartCount, heartBtn));
loveBtn.addEventListener("click", () => incrementCounter("love", loveCount, loveBtn));
candleBtn.addEventListener("click", () => incrementCounter("candle", candleCount, candleBtn));

// =====================
// INITIAL LOAD
// =====================
loadCounts();