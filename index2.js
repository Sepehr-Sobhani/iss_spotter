const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((body) => {
    console.log(body);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
