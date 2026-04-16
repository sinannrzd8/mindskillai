import { useState, useRef, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface UserLimits {
  isPremium: boolean;
  messageCount: number;
  maxFreeMessages: number;
}

interface UseChatOptions {
  initialMessages?: Message[];
  userLimits?: UserLimits;
  onMessageSent?: (message: Message) => void;
  onLimitReached?: () => void;
}

export const useChat = (options: UseChatOptions = {}) => {
  const {
    initialMessages = [],
    userLimits = { isPremium: false, messageCount: 0, maxFreeMessages: 10 },
    onMessageSent,
    onLimitReached
  } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLimits, setCurrentLimits] = useState<UserLimits>(userLimits);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Calculate user message count
  const userMessageCount = messages.filter(msg => msg.isUser).length;

  // Check if limit is reached
  const hasReachedLimit = !currentLimits.isPremium && userMessageCount >= currentLimits.maxFreeMessages;

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Update limits when user message count changes
  useEffect(() => {
    setCurrentLimits(prev => ({
      ...prev,
      messageCount: userMessageCount
    }));
  }, [userMessageCount]);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    if (message.isUser) {
      onMessageSent?.(newMessage);
    }

    return newMessage;
  }, [onMessageSent]);

  const sendMessage = useCallback(async (content: string, getResponse?: (content: string) => Promise<string>) => {
    if (!content.trim() || isLoading || hasReachedLimit) {
      if (hasReachedLimit) {
        onLimitReached?.();
      }
      return;
    }

    // Add user message
    const userMessage = addMessage({ content: content.trim(), isUser: true });
    setIsLoading(true);

    try {
      // Get AI response
      const responseContent = getResponse
        ? await getResponse(content)
        : "I'm processing your message...";

      // Add AI response
      addMessage({ content: responseContent, isUser: false });
    } catch (error) {
      // Add error message
      addMessage({
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasReachedLimit, addMessage, onLimitReached]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const updateLimits = useCallback((newLimits: Partial<UserLimits>) => {
    setCurrentLimits(prev => ({ ...prev, ...newLimits }));
  }, []);

  return {
    messages,
    isLoading,
    userMessageCount,
    hasReachedLimit,
    currentLimits,
    scrollAreaRef,
    sendMessage,
    addMessage,
    clearMessages,
    updateLimits,
    scrollToBottom
  };
};