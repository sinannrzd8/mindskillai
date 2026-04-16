// API utility for chatbot interactions
// This file prepares the architecture for OpenAI API integration

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  error?: string;
}

// Mock API call - replace with actual OpenAI API integration
export const sendChatMessage = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  // TODO: Replace with actual OpenAI API call
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-3.5-turbo',
  //     messages: messages,
  //     max_tokens: 500,
  //     temperature: 0.7
  //   })
  // });

  // For now, return a mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "This is a mock response. OpenAI API integration coming soon!"
      });
    }, 1000);
  });
};

// Helper function to format messages for API
export const formatMessagesForAPI = (chatMessages: Array<{content: string; isUser: boolean}>): ChatMessage[] => {
  const systemMessage: ChatMessage = {
    role: 'system',
    content: `You are MindSkill AI, a helpful assistant for emotional intelligence, learning, productivity, and career development.
    You provide supportive, encouraging responses focused on personal growth and development.
    Keep responses concise but helpful, typically 2-4 sentences.`
  };

  const formattedMessages = chatMessages.map(msg => ({
    role: msg.isUser ? 'user' as const : 'assistant' as const,
    content: msg.content
  }));

  return [systemMessage, ...formattedMessages];
};

// Environment variable validation
export const validateOpenAIConfig = (): boolean => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return Boolean(apiKey && apiKey.startsWith('sk-'));
};