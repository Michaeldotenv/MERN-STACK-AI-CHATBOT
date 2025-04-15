import axios from 'axios';


const hfClient = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models',
  headers: {
    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
export const formatPrompt = (message) => {
    return `<|user|>${message}</s><|assistant|>`;
  };

export const queryHF = async (inputs) => {
  try {
    const response = await hfClient.post(`/${process.env.MODEL_ID}`, { inputs });
    return response.data;
  } catch (error) {
    console.error('HF API Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};