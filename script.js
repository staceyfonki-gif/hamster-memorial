// --- Buttons ---
const heartBtn = document.getElementById("heartBtn");
const loveBtn = document.getElementById("loveBtn");
const candleBtn = document.getElementById("candleBtn");

// --- Display elements ---
const heartCount = document.getElementById("heartCount");
const loveCount = document.getElementById("loveCount");
const candleCount = document.getElementById("candleCount");

// --- Namespace and keys ---
const namespace = "hamster_memorial_stacey"; // make sure this is unique
const keys = { heart: "💖", love: "🤍", candle: "🕯" };

// --- Format numbers ---
function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
  return value;
}

// --- Ensure keys exist and return Promise of value ---
async function ensureKey(key) {
  try {
    let res = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
    let data = await res.json();
    if (data.value !== undefined) return data.value;
  } catch {}
  
  // Create key if doesn't exist
  await fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=0`);
  return 0;
}

// --- Load initial counts ---
async function loadCounts() {
  heartCount.textContent = formatNumber(await ensureKey("heart"));
  loveCount.textContent = formatNumber(await ensureKey("love"));
  candleCount.textContent = formatNumber(await ensureKey("candle"));
}

// --- Increment count ---
async function increment(key, element, btn) {
  try {
    let res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    let data = await res.json();
    element.textContent = formatNumber(data.value);

    // tiny pop animation
    btn.setAttribute("data-emoji", keys[key]);
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 600);
  } catch (err) {
    console.error("Error incrementing count:", err);
  }
}

// --- Load counts immediately ---
loadCounts();

// --- Add click events ---
heartBtn.addEventListener("click", () => increment("heart", heartCount, heartBtn));
loveBtn.addEventListener("click", () => increment("love", loveCount, loveBtn));
candleBtn.addEventListener("click", () => increment("candle", candleCount, candleBtn));