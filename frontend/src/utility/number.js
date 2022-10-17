function convertNumber(number) {
  if (number) {
    // number = (number / 100).toFixed(2);
    return `${number.toLocaleString()} €`;
  } else return number;
}

export { convertNumber };
