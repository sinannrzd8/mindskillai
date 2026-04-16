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

interface UserLimits {
  isPremium: boolean;
  messageCount: number;
  maxFreeMessages: number;
}

// Mock user limits - replace with actual auth/database logic later
export const getUserLimits = async (userId?: string): Promise<UserLimits> => {
  // TODO: Fetch from database/auth service
  // For now, return mock data
  return {
    isPremium: false, // Set to true to test premium features
    messageCount: 0, // This should be fetched from database
    maxFreeMessages: 10
  };
};

// Check if user has reached message limit
export const hasReachedMessageLimit = (limits: UserLimits): boolean => {
  return !limits.isPremium && limits.messageCount >= limits.maxFreeMessages;
};

// Mock API call - replace with actual OpenAI API integration
export const sendChatMessage = async (
  messages: ChatMessage[],
  userLimits: UserLimits
): Promise<ChatResponse> => {
  // Check limits before sending
  if (hasReachedMessageLimit(userLimits)) {
    return {
      message: "You've reached your free message limit. Please upgrade to continue.",
      error: "LIMIT_REACHED"
    };
  }

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

// Update user's message count in database
export const updateUserMessageCount = async (userId: string, newCount: number): Promise<void> => {
  // TODO: Update in database
  // This should be called after each user message is sent
  console.log(`Updating message count for user ${userId} to ${newCount}`);
};

// Environment variable validation
export const validateOpenAIConfig = (): boolean => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return Boolean(apiKey && apiKey.startsWith('sk-'));
};