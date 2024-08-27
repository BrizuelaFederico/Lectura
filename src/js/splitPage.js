function splitToPages(rows, numberRows) {
  const chunkedRows = [];
  for (let i = 0; i < rows.length; i += numberRows) {
    chunkedRows.push(rows.slice(i, i + numberRows));
  }
  return chunkedRows;
}

export { splitToPages };
