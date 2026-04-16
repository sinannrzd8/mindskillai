import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import MessageBubble from './MessageBubble';
import QuickPrompts from './QuickPrompts';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Mock premium status - replace with actual auth logic later
const isPremium = false;
const FREE_MESSAGE_LIMIT = 10;

const mockResponses = {
  'study motivation': [
    "Great question! To stay motivated while studying, try breaking your study sessions into 25-minute focused intervals with 5-minute breaks (Pomodoro technique). Reward yourself after completing each session!",
    "Remember your 'why' - why are you learning this? Keep that goal in mind. Also, create a study environment that inspires you and eliminate distractions.",
    "Studies show that consistent small daily efforts beat cramming. Set achievable daily goals and track your progress to build momentum."
  ],
  'career advice': [
    "Focus on building both hard skills (technical expertise) and soft skills (communication, leadership). The most successful careers combine both.",
    "Network actively but authentically. Attend industry events, join online communities, and don't be afraid to reach out to people you admire.",
    "Continuous learning is key in today's fast-changing job market. Identify emerging trends in your field and upskill proactively."
  ],
  'emotional support': [
    "It's completely normal to feel stressed sometimes. Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. This activates your parasympathetic nervous system.",
    "Remember that emotions are temporary. When you're feeling overwhelmed, ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    "You're not alone in this. Many successful people face similar challenges. Consider talking to a trusted friend or mentor about what you're going through."
  ],
  'productivity coaching': [
    "Start your day with the most important task (eat the frog first). This builds momentum and gives you a sense of accomplishment early.",
    "Use the Eisenhower Matrix to prioritize: urgent/important tasks first, then important/not urgent, delegate urgent/not important, eliminate neither.",
    "Track your time for a week to identify patterns. Most people underestimate how much time they spend on low-value activities."
  ]
};

const getMockResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('motivat')) {
    return mockResponses['study motivation'][Math.floor(Math.random() * mockResponses['study motivation'].length)];
  }
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
    return mockResponses['career advice'][Math.floor(Math.random() * mockResponses['career advice'].length)];
  }
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('overwhelm') || lowerMessage.includes('feel')) {
    return mockResponses['emotional support'][Math.floor(Math.random() * mockResponses['emotional support'].length)];
  }
  if (lowerMessage.includes('productiv') || lowerMessage.includes('focus') || lowerMessage.includes('time') || lowerMessage.includes('efficien')) {
    return mockResponses['productivity coaching'][Math.floor(Math.random() * mockResponses['productivity coaching'].length)];
  }

  // Default response
  return "I'm here to help you with study motivation, career advice, emotional support, and productivity coaching. What specific area would you like to focus on?";
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your MindSkill AI assistant. I'm here to help with study motivation, career advice, emotional support, and productivity coaching. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Track user message count for limits
  const userMessageCount = messages.filter(msg => msg.isUser).length;
  const hasReachedLimit = !isPremium && userMessageCount >= FREE_MESSAGE_LIMIT;
  const usagePercentage = isPremium ? 0 : (userMessageCount / FREE_MESSAGE_LIMIT) * 100;

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        // Use requestAnimationFrame for smooth scrolling
        requestAnimationFrame(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current && !hasReachedLimit) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, hasReachedLimit]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading || hasReachedLimit) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(content),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !hasReachedLimit) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (!hasReachedLimit) {
      handleSendMessage(prompt);
    }
  };

  const handleUpgrade = () => {
    // TODO: Implement upgrade flow - redirect to pricing page or open modal
    console.log('Upgrade to premium clicked');
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:items-center md:justify-center md:p-0">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Fixed height modal container */}
          <div className="relative w-full max-w-md h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">MindSkill AI</h3>
                  <p className="text-xs opacity-90">Your personal growth assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isPremium && (
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                    <Crown className="h-3 w-3" />
                    <span className="text-xs font-medium">Premium</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Usage Indicator - Only show for free users */}
            {!isPremium && (
              <div className="px-4 py-2 bg-orange-50 dark:bg-orange-950/20 border-b border-orange-200 dark:border-orange-800 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-orange-800 dark:text-orange-200">
                    {userMessageCount} / {FREE_MESSAGE_LIMIT} Free Messages Used
                  </span>
                  {hasReachedLimit && (
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                      <Zap className="h-3 w-3" />
                      <span className="text-xs font-medium">Limit Reached</span>
                    </div>
                  )}
                </div>
                <Progress
                  value={usagePercentage}
                  className="h-1.5 bg-orange-200 dark:bg-orange-800"
                  // Custom progress bar styling for warning state
                  style={{
                    '--progress-background': hasReachedLimit ? '#dc2626' : '#f97316'
                  } as React.CSSProperties}
                />
              </div>
            )}

            {/* Messages Area - Fixed height with scrolling */}
            <div className="flex-1 min-h-0 flex flex-col">
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}

                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-2xl rounded-tl-md bg-gray-100 dark:bg-gray-800 p-3">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Prompts - Only show if not at limit and no messages yet */}
              {messages.length === 1 && !isLoading && !hasReachedLimit && (
                <div className="px-4 pb-2 flex-shrink-0">
                  <QuickPrompts onPromptSelect={handleQuickPrompt} />
                </div>
              )}

              {/* Limit Reached Message */}
              {hasReachedLimit && (
                <div className="px-4 pb-4 flex-shrink-0">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                    <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
                      You've reached your free AI assistant limit. Upgrade to Premium for unlimited mentoring.
                    </p>
                    <Button
                      onClick={handleUpgrade}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      size="sm"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={hasReachedLimit ? "Upgrade to continue chatting..." : "Ask me anything..."}
                  disabled={isLoading || hasReachedLimit}
                  className={`flex-1 ${hasReachedLimit ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading || hasReachedLimit}
                  size="sm"
                  className={`px-3 ${hasReachedLimit ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}