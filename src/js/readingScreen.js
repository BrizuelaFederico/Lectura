const $screen = document.querySelector("article div");

function showText(text) {
  console.log($screen);
  const rows = text.split("\n"); //TODO: rows, sets, words acordding to setting
  let innerHTML = "";
  for (let row of rows) {
    innerHTML = innerHTML.concat("<div><span>" + row + "</span></div>");
  }
  console.log(innerHTML);
  $screen.innerHTML = innerHTML;
}

export { showText };
