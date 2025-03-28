
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, UserMinus, MessageSquare, Search, UserCheck } from "lucide-react";

// Sample friend data
const allFriends = [
  { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg", status: "online", mutualFriends: 12 },
  { id: 2, name: "Sarah Williams", avatar: "/placeholder.svg", status: "offline", mutualFriends: 8 },
  { id: 3, name: "David Martinez", avatar: "/placeholder.svg", status: "online", mutualFriends: 5 },
  { id: 4, name: "Emily Chen", avatar: "/placeholder.svg", status: "online", mutualFriends: 15 },
  { id: 5, name: "Michael Brown", avatar: "/placeholder.svg", status: "offline", mutualFriends: 3 },
  { id: 6, name: "Jessica Lee", avatar: "/placeholder.svg", status: "offline", mutualFriends: 7 },
];

const friendRequests = [
  { id: 101, name: "James Wilson", avatar: "/placeholder.svg", mutualFriends: 4 },
  { id: 102, name: "Olivia Taylor", avatar: "/placeholder.svg", mutualFriends: 9 },
];

const suggestions = [
  { id: 201, name: "Ryan Garcia", avatar: "/placeholder.svg", mutualFriends: 6 },
  { id: 202, name: "Sophia Kim", avatar: "/placeholder.svg", mutualFriends: 11 },
  { id: 203, name: "Daniel Thomas", avatar: "/placeholder.svg", mutualFriends: 2 },
];

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter friends based on search query
  const filteredFriends = allFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-facebook-light">
      <Header />
      <div className="pt-14 flex">
        <LeftSidebar />
        <div className="flex-1 p-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Friends</h1>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search Friends"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All Friends</TabsTrigger>
                <TabsTrigger value="requests">Friend Requests</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {filteredFriends.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">No friends match your search.</p>
                ) : (
                  filteredFriends.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="requests" className="space-y-4">
                {friendRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </TabsContent>
              
              <TabsContent value="suggestions" className="space-y-4">
                {suggestions.map(suggestion => (
                  <SuggestionCard key={suggestion.id} suggestion={suggestion} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Friend Card Component
const FriendCard = ({ friend }) => (
  <Card className="hover:bg-gray-50 transition-colors">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={friend.avatar} alt={friend.name} />
          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{friend.name}</h3>
          <p className="text-sm text-gray-500">{friend.mutualFriends} mutual friends</p>
          {friend.status === "online" && (
            <span className="inline-flex items-center text-xs text-green-600">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
              Online
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Button>
        <Button variant="ghost" size="sm">
          <UserMinus className="h-4 w-4 mr-1" />
          Unfriend
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Friend Request Card Component
const RequestCard = ({ request }) => (
  <Card className="hover:bg-gray-50 transition-colors">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={request.avatar} alt={request.name} />
          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{request.name}</h3>
          <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="default" size="sm" className="bg-facebook-primary">
          <UserCheck className="h-4 w-4 mr-1" />
          Accept
        </Button>
        <Button variant="outline" size="sm">
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Friend Suggestion Card Component
const SuggestionCard = ({ suggestion }) => (
  <Card className="hover:bg-gray-50 transition-colors">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
          <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{suggestion.name}</h3>
          <p className="text-sm text-gray-500">{suggestion.mutualFriends} mutual friends</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="default" size="sm" className="bg-facebook-primary">
          <UserPlus className="h-4 w-4 mr-1" />
          Add Friend
        </Button>
        <Button variant="outline" size="sm">
          Remove
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default Friends;
