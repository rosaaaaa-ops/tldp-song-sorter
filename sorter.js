let list = [];
let leftList = [];
let rightList = [];
let index = 0;
let total = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function start() {
  shuffle(songs);
  list = songs.map(s => [s]);
  total = songs.length;
  nextRound();
}

function nextRound() {
  if (list.length <= 1) {
    document.body.innerHTML =
      "<h1>Results</h1><ol>" +
      list[0].map(s => `<li>${s}</li>`).join("") +
      "</ol>";
    return;
  }

  leftList = list.shift();
  rightList = list.shift();
  index = 0;
  show();
}

function show() {
  document.getElementById("left").innerText = leftList[index] || "";
  document.getElementById("right").innerText = rightList[index] || "";
  document.getElementById("progress").innerText =
    `Comparing ${leftList.length + rightList.length} songs`;
}

function choose(side) {
  if (side === 0) {
    list.push([leftList[index]]);
  } else {
    list.push([rightList[index]]);
  }
  index++;
  if (index >= Math.min(leftList.length, rightList.length)) {
    list.push(leftList.slice(index).concat(rightList.slice(index)));
    nextRound();
  } else {
    show();
  }
}

window.onload = start;
