const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

const fetchISSFlyOverTimes = (coords) => {
  const lon = JSON.parse(coords).lon;
  const lat = JSON.parse(coords).lat;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const response = JSON.parse(body).response;
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
