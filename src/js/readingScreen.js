const $screen = document.querySelector("article div");

function showPage(page) {
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

export { showPage };
