const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateResponse(req, res) {
  try {
    const { complaint } = req.body;

    if (!complaint) {
      return res.status(400).json({
        message: "Complaint text is required",
      });
    }

    const prompt = `You are an AI Assistant for a college administration system.
Provide only practical and professional solutions.
Complaint: "${complaint}"
Keep the response short and meaningful.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
    });

    res.json({
      response: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ message: "AI response failed" });
  }
}

module.exports = { generateResponse };
