const seasonsBox = document.getElementById("seasons");

for (let s = 1; s <= 9; s++) {
  const button = document.createElement("button");
  button.textContent = s;
  button.dataset.season = s;
  button.addEventListener("click", () => {
    console.log("clicked season", s);
  });
  seasonsBox.appendChild(button);
}