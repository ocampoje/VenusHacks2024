var express = require("express");
var router = express.Router();
require("dotenv").config();

router.post("/queryPOST", async function (req, res, next) {
  const userQuery = req.body.query || "query body";
  const systemMessage =
    req.body.systemMessage || "You are a helpful assistant."; // default

  return res.json({
    query: userQuery,
    systemMessage: systemMessage,
    additionalInfo: "Additional information if needed",
  });
});

router.get("/queryGET", async function (req, res, next) {
  
    return res.json({
      query: "userQuery",
      systemMessage: "systemMessage",
      additionalInfo: "Additional information if needed",
    });
  });

module.exports = router;