// import
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const analyzeSentiment = async (text) => {
  const messages = [
    {
      role: "system",
      content:
        "You will be provided with a text, and your task is to classify its sentiment as positive, neutral, or negative",
    },
    {
      role: "user",
      content: text,
    },
  ];
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages,
    max_tokens: 100,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
};

module.exports = { analyzeSentiment };
