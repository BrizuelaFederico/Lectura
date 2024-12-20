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
    let $pre = null;
    let $div = null;

    while ($screen.firstChild) {
      $screen.removeChild($screen.firstChild);
    }
    for (let row of page) {
      $div = document.createElement("div");
      for (let sets of row) {
        $pre = document.createElement("pre");
        $pre.textContent = sets.filter((word) => word != "\r\n").join(" ");
        $div.appendChild($pre);
      }
      $screen.appendChild($div);
    }
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
    $fileName.textContent = name;
  }

  goNextRow() {
    const $nextRow = this.getNextRow(this.$actualRow);
    if (!$nextRow) return false;
    this.$actualRow = $nextRow;
    let $newSet = this.$actualRow.firstElementChild;
    this.addRemoveSelectedClass($newSet, this.$actualSet);
    this.$actualSet = $newSet;
    return true;
  }

  getNextRow($row) {
    const $nextRow = $row.nextElementSibling;
    if (!$nextRow) return false;
    if ($nextRow.firstElementChild.textContent == "")
      return this.getNextRow($nextRow);
    return $nextRow;
  }

  goPreviousRow(endSet = false) {
    const $previousRow = this.$actualRow.previousElementSibling;
    if (!$previousRow) return false;
    this.$actualRow = $previousRow;
    let $newSet = null;
    if (endSet) {
      $newSet = this.$actualRow.lastElementChild;
    } else {
      $newSet = this.$actualRow.firstElementChild;
    }
    this.addRemoveSelectedClass($newSet, this.$actualSet);
    this.$actualSet = $newSet;
    return true;
  }

  goNextSet() {
    const $nextSet = this.$actualSet.nextElementSibling;
    if ($nextSet) {
      this.addRemoveSelectedClass($nextSet, this.$actualSet);
      this.$actualSet = $nextSet;
      return true;
    }
    return this.goNextRow();
  }

  goPreviousSet() {
    const $previousSet = this.$actualSet.previousElementSibling;
    if ($previousSet) {
      this.addRemoveSelectedClass($previousSet, this.$actualSet);
      this.$actualSet = $previousSet;
      return true;
    }
    return this.goPreviousRow(true);
  }

  addRemoveSelectedClass(newSet, oldSet) {
    oldSet.classList.remove("selected");
    newSet.classList.add("selected");
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

export { ReadingScreen };
