import axios from 'axios';

const HF_API_KEY = process.env.HF_API_KEY // Get from .env
const HF_MODEL = 'mistralai/Mistral-7B-Instruct-v0.1'; // Change to your preferred model

const hfClient = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models',
  headers: {
    'Authorization': `Bearer ${HF_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
export const formatPrompt = (message) => {
    return `<|user|>${message}</s><|assistant|>`;
  };

export const queryHF = async (inputs) => {
  try {
    const response = await hfClient.post(`/${HF_MODEL}`, { inputs });
    return response.data;
  } catch (error) {
    console.error('HF API Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};