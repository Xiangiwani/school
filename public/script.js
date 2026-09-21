const knop = document.getElementById("welkomKnop");
const melding = document.getElementById("melding");
let timer;

knop.addEventListener("click", () => {
  // melding laten zien
  melding.classList.add("zichtbaar");
  clearTimeout(timer);
  timer = setTimeout(() => melding.classList.remove("zichtbaar"), 3000);

  // confetti
  const kleuren = ["#ff9a9e", "#a1c4fd", "#d6336c", "#1b3a8a", "#ffd166"];
  for (let i = 0; i < 40; i++) {
    const stukje = document.createElement("div");
    stukje.className = "confetti";
    stukje.style.left = Math.random() * 100 + "vw";
    stukje.style.background = kleuren[Math.floor(Math.random() * kleuren.length)];
    stukje.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
    stukje.style.animationDelay = Math.random() * 0.4 + "s";
    document.body.appendChild(stukje);
    setTimeout(() => stukje.remove(), 3500);
  }
});