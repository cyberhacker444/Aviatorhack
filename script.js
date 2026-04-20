const quotes = [
  "Stay sharp. Time your move.",
  "Precision wins the round.",
  "Observe. Predict. Execute.",
  "Every second counts.",
  "Play smart, not fast."
];

const splash = document.getElementById("splash");
const landing = document.getElementById("landing");
const loader = document.getElementById("loader");
const app = document.getElementById("appContainer");
const btn = document.getElementById("startBtn");
const quote = document.getElementById("quote");
const barQuote = document.getElementById("barQuote");
const installBtn = document.getElementById("installBtn");

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

quote.textContent = randomQuote();
barQuote.textContent = randomQuote();

setInterval(() => {
  barQuote.textContent = randomQuote();
}, 5000);

// First vs returning user
if (!localStorage.getItem("aviator_app_opened")) {
  setTimeout(() => {
    splash.style.display = "none";
    landing.style.display = "flex";
  }, 2000);
} else {
  splash.style.display = "none";
  landing.style.display = "flex";
  btn.textContent = "Continue Predicting";
}

// Start button
btn.onclick = () => {
  localStorage.setItem("aviator_app_opened", "yes");

  landing.style.display = "none";
  loader.style.display = "flex";

  setTimeout(() => {
    loader.style.display = "none";
    app.style.display = "block";
  }, 1200);
};

// Install
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.onclick = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  }
  installBtn.style.display = "none";
};

// Service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
