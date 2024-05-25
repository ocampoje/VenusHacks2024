var express = require("express");
var router = express.Router();
var OpenAI = require("openai");
require("dotenv").config();

// https://platform.openai.com/docs/api-reference/introduction
// https://www.npmjs.com/package/openai

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/query", async function (req, res, next) {
  const userQuery = req.body.query;
  const systemMessage =
    req.body.systemMessage || "You are a helpful assistant."; // default


  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage }, // sys msg gives instructions on how the model behaves
        { role: "user", content: userQuery }, // like typing into the gui of chatgpt
      ],
      max_tokens: 150,
      temperature: 0,
    });

    const chatResponse = response.choices[0].message.content.trim();
    return res.json({ response: chatResponse });
  } catch (error) {

      return next(error);
    
  }

});

module.exports = router;
