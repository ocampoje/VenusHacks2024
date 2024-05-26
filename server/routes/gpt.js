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
  // LECTURE_TRANSCRIPT: <insert lecture transcript>
  // STUDENT_NOTES: <insert student notes>
  const userQuery = `
  LECTURE_TRANSCRIPT: <${req.body.transcript}>

  STUDENT_NOTES: <${req.body.notes}>
  
  `;
  const systemMessage =`
  Follow these steps to answer the user queries.

  Step 1 - First take the lecture transcript provided in USER’s LECTURE_TRANSCRIPT and write your own extremely detailed notes on it. Don’t rely on the USER’s STUDENT_NOTES because they may be incorrect or missing data. Enclose all your work for this step within triple quotes (""").
  
  Step 2 - Compare your notes to the USER’s STUDENT_NOTES and provide feedback based on if they are wrong in any way. For example, if they are missing a key concept, part of an explanation is wrong, etc. In addition to this you can refer back to the LECTURE_TRANSCRIPT when needed. DO NOT MAKE UP INFORMATION. Enclose all your work for this step within triple quotes (""").
  
  Step 3 - Output this result to the user as an array in the provided format. Each feedback should be a distinct topic and provide where in the LECTURE_TRANSCRIPT the information was obtained. For example, if the feedback is about a missing concept, provide the sentence(s) in the LECTURE_TRANSCRIPT where the concept was discussed. 
  Another example is if there is wrong information provide the sentence(s) in the LECTURE_TRANSCRIPT where the concept was discussed and provide the correct information.

  Example format:
  /**@**/["feedback1 text", "feedback2 text", "feedback3 text",...]/**@**/  -include citation. If there is no feedback, provide an empty array. make sure to have /**@**/ before and after array to make parsing easier.

  `;


  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage }, // sys msg gives instructions on how the model behaves
        { role: "user", content: userQuery }, // like typing into the gui of chatgpt
      ],
      max_tokens: 4000,
      temperature: 0,
    });

    const chatResponse = response.choices[0].message.content.trim();
    return res.json({ response: chatResponse });
  } catch (error) {
      console.error("Failed to generate response:", error);
      return next(error);
    
  }

});

module.exports = router;
