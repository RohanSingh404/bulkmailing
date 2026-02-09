const app = require("../backend/server");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://bulkmailingswapsobtc.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return app(req, res);
};
