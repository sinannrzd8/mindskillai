import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockDatabase } from '@/lib/database';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export default function StudentChatPage() {
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat rooms - in production, fetch from API
  useEffect(() => {
    if (user?.courseId) {
      // Get all students in the same course
      const courseStudents = mockDatabase.getUsersByRole('student')
        .filter(student => student.courseId === user.courseId && student.id !== user.id);

      const rooms: ChatRoom[] = [
        {
          id: 'general',
          name: `${user.courseId} General Chat`,
          participants: courseStudents.map(s => s.id),
          unreadCount: 0
        },
        // Individual chats with other students
        ...courseStudents.map(student => ({
          id: `private_${student.id}`,
          name: student.fullName,
          participants: [student.id],
          unreadCount: Math.floor(Math.random() * 3) // Mock unread count
        }))
      ];

      setChatRooms(rooms);
      setSelectedRoom('general');
    }
  }, [user]);

  // Load messages for selected room
  useEffect(() => {
    if (selectedRoom) {
      // Mock messages - in production, fetch from API
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: 'system',
          senderName: 'System',
          content: `Welcome to ${selectedRoom === 'general' ? 'the general chat' : 'this conversation'}!`,
          timestamp: new Date(Date.now() - 3600000),
          isCurrentUser: false
        },
        {
          id: '2',
          senderId: 'student1',
          senderName: 'Alice Johnson',
          content: 'Hey everyone! Excited for the upcoming project deadline.',
          timestamp: new Date(Date.now() - 1800000),
          isCurrentUser: false
        },
        {
          id: '3',
          senderId: 'student2',
          senderName: 'Bob Smith',
          content: 'Same here! Anyone want to form a study group?',
          timestamp: new Date(Date.now() - 900000),
          isCurrentUser: false
        }
      ];

      setMessages(mockMessages);
    }
  }, [selectedRoom]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName,
      content: newMessage.trim(),
      timestamp: new Date(),
      isCurrentUser: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // In production, send to API
    console.log('Sending message:', message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Chat Rooms Sidebar */}
        <div className="w-80 border-r border-border/50 bg-card/50">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold mb-3">Student Communications</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    selectedRoom === room.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {room.id === 'general' ? <Users className="h-4 w-4" /> : room.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{room.name}</p>
                        {room.unreadCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>
                      {room.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {room.lastMessage.senderName}: {room.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 bg-card/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {selectedRoom === 'general' ? <Users className="h-4 w-4" /> : chatRooms.find(r => r.id === selectedRoom)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {chatRooms.find(r => r.id === selectedRoom)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedRoom === 'general'
                        ? `${chatRooms.find(r => r.id === selectedRoom)?.participants.length} participants`
                        : 'Direct message'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[70%] ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="" />
                          <AvatarFallback className="text-xs">
                            {message.senderName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex flex-col ${message.isCurrentUser ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{message.senderName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-2 text-sm ${
                              message.isCurrentUser
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50 bg-card/50">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a chat room or direct message to start communicating with other students.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}