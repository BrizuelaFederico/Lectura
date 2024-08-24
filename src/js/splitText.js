function splitText(text) {
  return text
    .split(/(\r\n|\t)/)
    .flatMap((subtext) => subtext.split(" "))
    .filter((word) => word != "");
}

export { splitText };
