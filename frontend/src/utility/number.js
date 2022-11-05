function convertCurrency(number) {
  if (Number.isFinite(number))
    return `${(number / 100).toLocaleString(
      process.env.REACT_APP_CURRENCY_LOCALES
    )} €`;
  else return "";
}

function convertNumber(number) {
  return number.toLocaleString(process.env.REACT_APP_CURRENCY_LOCALES);
}

function convertFromString(string) {
  if (process.env.REACT_APP_CURRENCY_LOCALES !== "de-DE")
    throw new Error("Currency not supported");
  if (string)
    return parseFloat(string.replace(".", "").replace(",", ".")) * 100;
  else return 0;
}

export { convertCurrency, convertNumber, convertFromString };
