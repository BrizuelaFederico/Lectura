const $screen = document.querySelector("article div");
const $fileName = document.querySelector("article p");

class ReadingScreen {
  constructor() {
    this.$actualRow = null;
    this.$actualSet = null;
  }

  showPage(page, goLastIndex) {
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

    if (goLastIndex) {
      this.$actualRow = $screen.lastElementChild;
      this.$actualSet = this.$actualRow.lastElementChild;
      console.log(this.$actualSet);
    } else {
      this.$actualRow = $screen.firstElementChild;
      this.$actualSet = this.$actualRow.firstElementChild;
      console.log(this.$actualSet);
    }
  }

  showFileName(name) {
    $fileName.innerHTML = name;
  }

  hasNextRow() {
    return this.$actualRow.nextElementSibling;
  }

  goNextRow() {
    if (this.hasNextRow()) {
      this.$actualRow = this.$actualRow.nextElementSibling;
      this.$actualSet = this.$actualRow.firstElementChild;
    }
  }

  hasPreviousRow() {
    return this.$actualRow.previousElementSibling;
  }

  goPreviousRow(endSet = false) {
    if (this.hasPreviousRow()) {
      this.$actualRow = this.$actualRow.previousElementSibling;
      if (endSet) {
        this.$actualSet = this.$actualRow.lastElementChild;
      } else {
        this.$actualSet = this.$actualRow.firstElementChild;
      }
    }
  }

  hasNextSet() {
    return this.$actualSet.nextElementSibling;
  }

  goNextSet() {
    if (this.hasNextSet()) {
      this.$actualSet = this.$actualSet.nextElementSibling;
      console.log(this.$actualSet);
    } else {
      this.goNextRow();
    }
  }

  hasPreviousSet() {
    return this.$actualSet.previousElementSibling;
  }

  goPreviousSet() {
    if (this.hasPreviousSet()) {
      this.$actualSet = this.$actualSet.previousElementSibling;
      console.log(this.$actualSet);
    } else {
      this.goPreviousRow(true);
    }
  }
}

const readingScreen = new ReadingScreen();

export { readingScreen };
