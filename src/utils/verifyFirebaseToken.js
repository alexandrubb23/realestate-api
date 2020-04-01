const jwt = require("jsonwebtoken");
const config = require("config");
const fetchBody = require("./fetchBody");
const fs = require("fs").promises;

/**
 * Verify firebase token.
 *
 * For this demo I will not check
 * if the current token is expired or not...
 *
 * @see https://firebase.google.com/docs/auth/admin/verify-id-tokens
 * @param {url} Fetch google public keys
 * @param {string} token
 * @returns string
 */
async function verifyFirebaseToken(token) {
  const publicKeys = "publicKeys.json";
  const url = config.get("google.jwt.publicKeysUrl");

  await fetchBody(url, body => {
    // we should verify the cache-control
    // max-age to know when cu fetch nex
    // but for this demo we keep it as it is
    fs.writeFile(publicKeys, body, "utf8");
  });

  let keys = await fs.readFile(publicKeys);
  keys = JSON.parse(keys);

  // take the header part from the token
  // and converting between Buffer's and strings
  const header64 = token.split(".")[0];
  const json = Buffer.from(header64, "base64").toString("ascii");
  const header = JSON.parse(json);

  const options = { algorithms: [header.alg] };
  return jwt.verify(token, keys[header.kid], options);
}

module.exports = verifyFirebaseToken;
