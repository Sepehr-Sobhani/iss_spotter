const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passtime) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //   Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
  console.log(passtime);
});
