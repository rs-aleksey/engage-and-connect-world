
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Video, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Sample conversation data
const conversations = [
  { id: 1, name: "Jane Cooper", avatar: "/placeholder.svg", lastMessage: "Hey, how are you doing?", timestamp: "10m", unread: 2, online: true },
  { id: 2, name: "Robert Fox", avatar: "/placeholder.svg", lastMessage: "The project deadline is tomorrow", timestamp: "2h", unread: 0, online: true },
  { id: 3, name: "Wade Warren", avatar: "/placeholder.svg", lastMessage: "Did you see the game last night?", timestamp: "1d", unread: 0, online: false },
  { id: 4, name: "Esther Howard", avatar: "/placeholder.svg", lastMessage: "I'll send you the files soon", timestamp: "3d", unread: 0, online: true },
  { id: 5, name: "Leslie Alexander with a very long name", avatar: "/placeholder.svg", lastMessage: "Thanks for your help!", timestamp: "1w", unread: 0, online: false },
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
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
    
    // Simulate a response after 1 second
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: activeConversation.name,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
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
              <div className="w-1/3 border-r border-gray-200 bg-gray-50">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <h1 className="text-xl font-bold mb-4">Messages</h1>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search Messages"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full bg-gray-100 border-0"
                    />
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  {filteredConversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors ${activeConversation.id === conversation.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback className="bg-facebook-primary text-white">{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm whitespace-normal line-clamp-1">{conversation.name}</h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-1">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-facebook-primary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
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
                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                        <AvatarFallback className="bg-facebook-primary text-white">{activeConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {activeConversation.online && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{activeConversation.name}</h3>
                      <p className="text-xs text-gray-500">
                        {activeConversation.online ? 'Active now' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-facebook-primary">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-facebook-primary">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-facebook-primary">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 bg-gray-50">
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
                              <AvatarFallback className="bg-facebook-primary text-white">{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div 
                              className={`px-4 py-2 rounded-2xl ${
                                message.isMine 
                                  ? 'bg-facebook-primary text-white' 
                                  : 'bg-gray-200 text-gray-800'
                              }`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-1">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 bg-gray-100 border-0"
                    />
                    <Button type="submit" className="bg-facebook-primary hover:bg-facebook-hover rounded-full">
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
