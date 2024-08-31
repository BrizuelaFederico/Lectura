const $screen = document.querySelector(".reading");
const $fileName = document.querySelector("article p");
const $fullscreen = document.querySelector(".fullscreen");
const $fullscreenButton = document.getElementById("fullscreen");

class ReadingScreen {
  constructor() {
    this.$actualRow = null;
    this.$actualSet = null;
  }

  showPage(page, endRow = false, endSet = false) {
    let innerHTML = "";
    let text = "";
    for (let row of page) {
      text = "";
      for (let sets of row) {
        text = text.concat(`<pre>${sets.join(" ")}</pre>`);
      }
      if (text == "") text = "<pre class=lineBreak>_</pre>";
      innerHTML = innerHTML.concat(`<div>${text}</div>`);
    }
    $screen.innerHTML = innerHTML;
    this.getRowSet(endRow, endSet);
  }

  getRowSet(endRow, endSet) {
    if (endRow) {
      this.$actualRow = $screen.lastElementChild;
    } else {
      this.$actualRow = $screen.firstElementChild;
    }

    if (endSet) {
      this.$actualSet = this.$actualRow.lastElementChild;
    } else {
      this.$actualSet = this.$actualRow.firstElementChild;
    }
    this.$actualSet.classList.add("selected");
  }

  showFileName(name) {
    $fileName.innerHTML = name;
  }

  goNextRow() {
    const $nextRow = this.$actualRow.nextElementSibling;
    if (!$nextRow) return false;
    this.$actualRow = $nextRow;
    this.$actualSet.classList.remove("selected");
    this.$actualSet = this.$actualRow.firstElementChild;
    this.$actualSet.classList.add("selected");
    return true;
  }

  goPreviousRow(endSet = false) {
    const $previousRow = this.$actualRow.previousElementSibling;
    if (!$previousRow) return false;
    this.$actualRow = $previousRow;
    this.$actualSet.classList.remove("selected");
    if (endSet) {
      this.$actualSet = this.$actualRow.lastElementChild;
    } else {
      this.$actualSet = this.$actualRow.firstElementChild;
    }
    this.$actualSet.classList.add("selected");
    return true;
  }

  goNextSet() {
    const $nextSet = this.$actualSet.nextElementSibling;
    if ($nextSet) {
      this.$actualSet.classList.remove("selected");
      this.$actualSet = $nextSet;
      this.$actualSet.classList.add("selected");
      return true;
    }
    return this.goNextRow();
  }

  goPreviousSet() {
    const $previousSet = this.$actualSet.previousElementSibling;
    if ($previousSet) {
      this.$actualSet.classList.remove("selected");
      this.$actualSet = $previousSet;
      this.$actualSet.classList.add("selected");
      return true;
    }
    return this.goPreviousRow(true);
  }
}

$fullscreenButton.addEventListener("click", (event) => {
  toggleFullScreen();
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    $fullscreen.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

const readingScreen = new ReadingScreen();

export { readingScreen };
