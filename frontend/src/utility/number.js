function convertCurrency(number) {
  return `${(number / 100).toLocaleString(
    process.env.REACT_APP_CURRENCY_LOCALES
  )}`;
}

function convertNumber(number) {
  return number.toLocaleString(process.env.REACT_APP_CURRENCY_LOCALES);
}

function convertFromString(string) {
  if (process.env.REACT_APP_CURRENCY_LOCALES !== "de-DE")
    throw "Currency not supported";
  return parseFloat(string.replace(".", "").replace(",", ".")) * 100;
}

export { convertCurrency, convertNumber, convertFromString };
