
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample conversation data
const conversations = [
  { id: 1, name: "Jane Cooper", avatar: "/placeholder.svg", lastMessage: "Hey, how are you doing?", timestamp: "10m", unread: 2, online: true },
  { id: 2, name: "Robert Fox", avatar: "/placeholder.svg", lastMessage: "The project deadline is tomorrow", timestamp: "2h", unread: 0, online: true },
  { id: 3, name: "Wade Warren", avatar: "/placeholder.svg", lastMessage: "Did you see the game last night?", timestamp: "1d", unread: 0, online: false },
  { id: 4, name: "Esther Howard", avatar: "/placeholder.svg", lastMessage: "I'll send you the files soon", timestamp: "3d", unread: 0, online: true },
  { id: 5, name: "Leslie Alexander", avatar: "/placeholder.svg", lastMessage: "Thanks for your help!", timestamp: "1w", unread: 0, online: false },
];

// Sample messages for active conversation
const sampleMessages = [
  { id: 1, sender: "Jane Cooper", content: "Hey there! How's your day going?", timestamp: "10:32 AM", isMine: false },
  { id: 2, sender: "You", content: "Pretty good, thanks! Just working on that project we discussed.", timestamp: "10:35 AM", isMine: true },
  { id: 3, sender: "Jane Cooper", content: "Awesome! How's the progress coming along?", timestamp: "10:37 AM", isMine: false },
  { id: 4, sender: "You", content: "I've completed about 70% of it. Should be done by tomorrow.", timestamp: "10:39 AM", isMine: true },
  { id: 5, sender: "Jane Cooper", content: "That's great to hear! Let me know if you need any help with it.", timestamp: "10:45 AM", isMine: false },
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-facebook-light">
      <Header />
      <div className="pt-14 flex">
        <LeftSidebar />
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex h-[calc(100vh-7rem)]">
              {/* Conversations List */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h1 className="text-xl font-bold mb-4">Messages</h1>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search Messages"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full"
                    />
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  {filteredConversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      className={`p-4 flex items-center gap-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${activeConversation.id === conversation.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-facebook-primary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="w-2/3 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                      <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {activeConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex gap-2 max-w-[70%]">
                          {!message.isMine && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarImage src={activeConversation.avatar} alt={message.sender} />
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div 
                              className={`px-4 py-2 rounded-lg ${
                                message.isMine 
                                  ? 'bg-facebook-primary text-white rounded-br-none' 
                                  : 'bg-gray-100 rounded-bl-none'
                              }`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-facebook-primary">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
