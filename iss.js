const request = require("request");
const fetchMyIp = (callback) => {
  request("https://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
      return;
    }

    const lon = JSON.parse(body).lon;
    const lat = JSON.parse(body).lat;
    callback(null, { lat, lon });
  });
};

const fetchISSFlyOverTimes = (coord, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coord.lat}&lon=${coord.lon}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        callback(
          Error(
            `Status Code ${response.statusCode} when fetching Times for Coordinates: ${body}`
          ),
          null
        );
        return;
      }
      const times = JSON.parse(body).response;
      callback(null, times);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
