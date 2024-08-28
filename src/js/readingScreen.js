const $screen = document.querySelector("article div");
const $fileName = document.querySelector("article p");

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
        text = text.concat(`<span>${sets.join(" ")}</span>`);
      }
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
  }

  showFileName(name) {
    $fileName.innerHTML = name;
  }

  goNextRow() {
    const $nextRow = this.$actualRow.nextElementSibling;
    if (!$nextRow) return false;
    this.$actualRow = $nextRow;
    this.$actualSet = this.$actualRow.firstElementChild;
    return true;
  }

  goPreviousRow(endSet = false) {
    const $previousRow = this.$actualRow.previousElementSibling;
    if (!$previousRow) return false;
    this.$actualRow = $previousRow;
    if (endSet) {
      this.$actualSet = this.$actualRow.lastElementChild;
    } else {
      this.$actualSet = this.$actualRow.firstElementChild;
    }
    return true;
  }

  goNextSet() {
    const $nextSet = this.$actualSet.nextElementSibling;
    if ($nextSet) {
      this.$actualSet = $nextSet;
      return true;
    }
    return this.goNextRow();
  }

  goPreviousSet() {
    const $previousSet = this.$actualSet.previousElementSibling;
    if ($previousSet) {
      this.$actualSet = $previousSet;
      return true;
    }
    return this.goPreviousRow(true);
  }
}

const readingScreen = new ReadingScreen();

export { readingScreen };
