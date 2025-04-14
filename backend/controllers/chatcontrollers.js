/*import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "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"
});

export const handleChat = async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in OpenAI API call:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
};*/
import axios from 'axios';


const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.1"
const HUGGINGFACE_API_KEY = "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"


export const sendMessage = async (req, res, next) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  // Format messages into a prompt
  const prompt = messages
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n') + '\nAssistant:';

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const reply = response.data?.[0]?.generated_text?.replace(prompt, '').trim() ||
                  response.data?.generated_text?.replace(prompt, '').trim() ||
                  'No response.';

    res.status(200).json({ response: reply });
  } catch (err) {
    console.error('Hugging Face API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch from Hugging Face.' });
  }
};

