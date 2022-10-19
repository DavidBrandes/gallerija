class TimeConverter {
  constructor() {
    this.locales = process.env.REACT_APP_DATE_LOCALES;
    this.oneSecond = 1000;
    this.oneMinute = 60 * 1000;
    this.oneHour = 60 * 60 * 1000;
    this.oneDay = 24 * 60 * 60 * 1000;
    this.oneWeek = 7 * 24 * 60 * 60 * 1000;
  }
  getNextMidnight() {
    const nextMidnight = new Date();
    nextMidnight.setHours(24);
    nextMidnight.setMinutes(0);
    nextMidnight.setSeconds(0);
    nextMidnight.setMilliseconds(0);

    return nextMidnight.getTime();
  }
  getLastMidnight() {
    const lastMidnight = new Date();
    lastMidnight.setHours(0);
    lastMidnight.setMinutes(0);
    lastMidnight.setSeconds(0);
    lastMidnight.setMilliseconds(0);

    return lastMidnight.getTime();
  }
  convert(currentDate, comparisonDate, state) {
    //state: before, in, after bidding

    const lastMidnight = currentDate - this.getLastMidnight();
    const nextMidnight = currentDate - this.getNextMidnight();

    let diff = currentDate - comparisonDate;

    if (state === "before") diff = Math.min(0, diff);
    else if (state === "in") diff = Math.min(0, diff);
    else if (state === "after") diff = Math.max(0, diff);

    let datestring;
    if (diff >= this.oneWeek) {
      // more than a week ago
      datestring =
        "ended" +
        new Date(comparisonDate).toLocaleDateString(this.locales, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    } else if (diff >= lastMidnight) {
      //between yesterday midnight and a week ago
      datestring =
        "ended" +
        new Date(comparisonDate).toLocaleDateString(this.locales, {
          weekday: "long",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
    } else if (diff > 0) {
      //between now and yesterday midnight
      datestring =
        "ended today at" +
        new Date(comparisonDate)
          .toLocaleDateString(this.locales, {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
          .split(",")[1];
    } else if (diff === 0 && state) {
      // right now
      if (state === "before") datestring = "starts now";
      else if (state === "in") datestring = "ends now";
      else if (state === "after") datestring = "ended now";
    } else if (diff > -this.oneMinute && state !== "before") {
      //between now and a minute in the future
      const val = Math.round(-diff / 1000);
      datestring =
        val === 1 ? "1 second" : `${Math.round(-diff / 1000)} seconds`;

      if (state === "before") datestring = "starts in " + datestring;
      else if (state === "in") datestring = "ends in " + datestring;
    } else if (diff > -this.oneHour && state !== "before") {
      // between a minute in the future and an hour in the future
      const minutes = Math.ceil(-diff / this.oneMinute);
      // const seconds = Math.floor(
      //   (-diff % this.oneMinute) / this.oneSecond
      // ).toLocaleString("en-US", {
      //   minimumIntegerDigits: 2,
      //   useGrouping: false,
      // });
      datestring =
        minutes === 1
          ? `in less than ${minutes} minute`
          : `in less than ${minutes} minutes`;

      if (state === "before") datestring = "starts " + datestring;
      else if (state === "in") datestring = "ends " + datestring;
    } else if (diff > nextMidnight) {
      //between an hour in the future and today midnight
      datestring = new Date(comparisonDate)
        .toLocaleDateString(this.locales, {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .split(",")[1];

      if (state === "before") datestring = "starts today at" + datestring;
      else if (state === "in") datestring = "ends today at" + datestring;
    } else if (diff > -this.oneWeek) {
      // between today midnight and a week in the future
      datestring = new Date(comparisonDate).toLocaleDateString(this.locales, {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (state === "before") datestring = "starts " + datestring;
      else if (state === "in") datestring = "ends " + datestring;
    } else {
      // everything above a week in the future
      datestring = new Date(comparisonDate).toLocaleDateString(this.locales, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (state === "before") datestring = "starts " + datestring;
      else if (state === "in") datestring = "ends " + datestring;
    }

    return datestring;
  }
}

export default new TimeConverter();
