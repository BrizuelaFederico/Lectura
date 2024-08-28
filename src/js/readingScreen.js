const $screen = document.querySelector("article div");
const $fileName = document.querySelector("article p");

class ReadingScreen {
  constructor() {
    this.actualRow = null;
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
      this.actualRow = $screen.lastElementChild;
    } else {
      this.actualRow = $screen.firstElementChild;
    }
  }

  showFileName(name) {
    $fileName.innerHTML = name;
  }

  hasNextRow() {
    return this.actualRow.nextElementSibling;
  }

  goNextRow() {
    this.actualRow = this.actualRow.nextElementSibling || this.actualRow;
    console.log(this.actualRow); //TODO: delete, test only
  }

  hasPreviousRow() {
    return this.actualRow.previousElementSibling;
  }

  goPreviousRow() {
    this.actualRow = this.actualRow.previousElementSibling || this.actualRow;
    console.log(this.actualRow); //TODO: delete, test only
  }
}

const readingScreen = new ReadingScreen();

export { readingScreen };
