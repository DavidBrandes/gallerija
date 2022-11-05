function setSearch(props) {
  const search = new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(props)) {
    search.set(key, value);
  }
  const newURL = window.location.pathname + "?" + search.toString();

  window.history.replaceState(null, null, newURL);
}

export { setSearch };
