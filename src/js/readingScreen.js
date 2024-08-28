const $screen = document.querySelector("article div");
const $fileName = document.querySelector("article p");

class ReadingScreen {
  showPage(page) {
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
  }

  showFileName(name) {
    $fileName.innerHTML = name;
  }
}

const readingScreen = new ReadingScreen();

export { readingScreen };
