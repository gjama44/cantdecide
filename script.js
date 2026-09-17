const seasonsBox = document.getElementById("seasons");

let picked = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const KEY = "cantdecide.v1";

function save(record) {
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    // storage blocked or full — not fatal, just don't persist
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function today() {
  const d = new Date();
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}

for (let s = 1; s <= 9; s++) {
  const button = document.createElement("button");
  button.textContent = s;
  button.dataset.season = s;

  button.addEventListener("click", () => {
    // NEW — was console.log
    if (picked.has(s)) {
      picked.delete(s);
    } else {
      picked.add(s);
    }
    paint();
  });

  seasonsBox.appendChild(button);
}

function paint() {
  const buttons = document.querySelectorAll("#seasons button");
  buttons.forEach(b => {
    const isOn = picked.has(Number(b.dataset.season));
    b.setAttribute("aria-pressed", isOn);
  });

  const count = EPISODES.filter(e => picked.has(e[0])).length;
  document.getElementById("tally").textContent =
    picked.size + " seasons selected · " + count + " episodes";
}

document.getElementById("assign").addEventListener("click", () => {
  const pool = EPISODES.filter(e => picked.has(e[0]));
  if (pool.length === 0) return;

  const episode = pool[Math.floor(Math.random() * pool.length)];
  const record = { date: today(), episode: episode };

  save(record);
  showResult(record);
});

function showResult(record) {
  const e = record.episode;
  document.getElementById("result").textContent =
  "S" + e[0] + "E" + e[1] + " — " + e[3];
  
};
paint();

const saved = load();
if (saved && saved.date === today()) {
  showResult(saved);
}