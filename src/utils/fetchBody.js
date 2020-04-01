const https = require("https");

/**
 * Fetch a page.
 *
 * @param {url} url
 * @param {function} callback
 */
function fetchBody(url, callback) {
  https
    .get(url, res => {
      let body = "";

      res.on("data", chunk => {
        body += chunk;
      });

      res.on("end", () => {
        callback(body);
      });
    })
    .on("error", error => {
      console.error(error);
    });
}

module.exports = fetchBody;
