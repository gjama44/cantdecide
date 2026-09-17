const seasonsBox = document.getElementById("seasons");
const KEY = "cantdecide.v1";

let picked = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

function save(record) {
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
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

  const live = load();
  const hasToday = live && live.date === today();

  const assignBtn = document.getElementById("assign");
  assignBtn.disabled = hasToday || picked.size === 0;
  assignBtn.textContent = hasToday
    ? "Already assigned today"
    : "Assign my episode";

  document.getElementById("again").hidden = !hasToday;
}

function showResult(record) {
  const e = record.episode;
  document.getElementById("result").hidden = false;
  document.getElementById("slug").textContent = "Season " + e[0] + ", episode " + e[1];
  document.getElementById("title").textContent = e[3];

  const note = document.getElementById("note");
  if (record.rerolls > 0) {
    const f = record.first;
    note.textContent = "Reissued " + record.rerolls + "× — you were given " + f[3] + ".";
  } else {
    note.textContent = "Assigned. No appeal.";
  }
}

document.getElementById("assign").addEventListener("click", () => {
  const pool = EPISODES.filter(e => picked.has(e[0]));
  if (pool.length === 0) return;

  const episode = pool[Math.floor(Math.random() * pool.length)];
  const record = {
    date: today(),
    episode: episode,
    first: episode,
    rerolls: 0
  };

  save(record);
  showResult(record);
  paint();
});

document.getElementById("again").addEventListener("click", () => {
  const record = load();
  if (!record || record.date !== today()) return;

  const pool = EPISODES.filter(e => picked.has(e[0]));
  if (pool.length < 2) return;

  let episode;
  do {
    episode = pool[Math.floor(Math.random() * pool.length)];
  } while (episode[0] === record.episode[0] && episode[1] === record.episode[1]);

  record.episode = episode;
  record.rerolls = record.rerolls + 1;

  save(record);
  showResult(record);
  paint();
});

paint();

const saved = load();
if (saved && saved.date === today()) {
  showResult(saved);
}