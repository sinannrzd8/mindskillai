import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { content, isUser, timestamp } = message;

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      <div className={`flex-1 max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            isUser
              ? 'rounded-tr-md bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto'
              : 'rounded-tl-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          }`}
        >
          {content}
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {format(timestamp, 'HH:mm')}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0">
          <User className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
}