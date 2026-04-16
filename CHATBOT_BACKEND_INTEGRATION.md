# Chatbot Backend Integration Guide

This document outlines how to integrate the chatbot with your backend services.

## Current Architecture

The chatbot is designed with clean separation between frontend and backend concerns:

### Frontend Components
- `ChatWidget.tsx` - Main chat interface
- `MessageBubble.tsx` - Individual message display
- `QuickPrompts.tsx` - Quick action buttons
- `useChat.ts` - Custom hook for chat state management

### API Layer
- `chatApi.ts` - API utilities and mock implementations

## Backend Integration Points

### 1. User Authentication & Limits

**Current Implementation:**
```typescript
// Mock implementation in chatApi.ts
export const getUserLimits = async (userId?: string): Promise<UserLimits> => {
  return {
    isPremium: false, // Fetch from your auth/user service
    messageCount: 0,  // Fetch from database
    maxFreeMessages: 10
  };
};
```

**Backend Integration:**
```typescript
export const getUserLimits = async (userId: string): Promise<UserLimits> => {
  // Fetch from your user database/API
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());

  return {
    isPremium: user.subscription === 'premium',
    messageCount: user.chatMessageCount || 0,
    maxFreeMessages: 10
  };
};
```

### 2. Message Count Tracking

**Current Implementation:**
```typescript
// Mock implementation
export const updateUserMessageCount = async (userId: string, newCount: number): Promise<void> => {
  console.log(`Updating message count for user ${userId} to ${newCount}`);
};
```

**Backend Integration:**
```typescript
export const updateUserMessageCount = async (userId: string, newCount: number): Promise<void> => {
  await fetch(`/api/users/${userId}/chat-count`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageCount: newCount })
  });
};
```

### 3. OpenAI API Integration

**Current Implementation:**
```typescript
// Mock API call
export const sendChatMessage = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Mock response..." });
    }, 1000);
  });
};
```

**Backend Integration:**
```typescript
export const sendChatMessage = async (
  messages: ChatMessage[],
  userLimits: UserLimits
): Promise<ChatResponse> => {
  // Check limits first
  if (hasReachedMessageLimit(userLimits)) {
    return {
      message: "You've reached your free message limit. Please upgrade to continue.",
      error: "LIMIT_REACHED"
    };
  }

  // Call OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'API request failed');
  }

  return {
    message: data.choices[0].message.content
  };
};
```

### 4. Chat History Persistence

**Future Enhancement:**
```typescript
// Add to chatApi.ts
export const saveChatMessage = async (userId: string, message: Message): Promise<void> => {
  await fetch('/api/chat/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, ...message })
  });
};

export const getChatHistory = async (userId: string): Promise<Message[]> => {
  const response = await fetch(`/api/chat/messages/${userId}`);
  return response.json();
};
```

## Environment Variables

Add to your `.env` file:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_API_BASE_URL=https://your-api-domain.com
```

## Database Schema Suggestions

### Users Table
```sql
ALTER TABLE users ADD COLUMN
  chat_message_count INTEGER DEFAULT 0,
  subscription_type VARCHAR(20) DEFAULT 'free';
```

### Chat Messages Table
```sql
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

## Usage in Components

The `useChat` hook is designed to be backend-agnostic. Simply replace the mock API calls with real ones, and the UI will work seamlessly.

```typescript
// In ChatWidget.tsx, replace mock responses with real API
const { sendMessage } = useChat({
  onMessageSent: async (message) => {
    // Save to database
    await saveChatMessage(userId, message);
    // Update user count
    await updateUserMessageCount(userId, userMessageCount + 1);
  }
});
```