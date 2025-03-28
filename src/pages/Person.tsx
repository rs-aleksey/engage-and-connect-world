
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { MessageSquare, UserPlus, UserMinus, UserCheck, Image, Video, Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";

// Mock data for the person's page
const people = {
  1: {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    status: "online",
    location: "San Francisco, CA",
    work: "Software Engineer at Tech Co",
    education: "Computer Science, Stanford University",
    joinDate: "January 2018",
    mutualFriends: 12,
    isFriend: true,
    about: "Passionate about technology, hiking, and photography. Always looking to learn new things and meet interesting people.",
    photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    friends: [
      { id: 2, name: "Sarah Williams", avatar: "/placeholder.svg" },
      { id: 3, name: "David Martinez", avatar: "/placeholder.svg" },
      { id: 4, name: "Emily Chen", avatar: "/placeholder.svg" },
    ]
  },
  2: {
    id: 2,
    name: "Sarah Williams",
    avatar: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    status: "offline",
    location: "New York, NY",
    work: "UX Designer at Design Studio",
    education: "Graphic Design, RISD",
    joinDate: "March 2019",
    mutualFriends: 8,
    isFriend: true,
    about: "Creative soul with a passion for design, art, and travel. Coffee enthusiast and bookworm.",
    photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    friends: [
      { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg" },
      { id: 5, name: "Michael Brown", avatar: "/placeholder.svg" },
    ]
  },
  101: {
    id: 101,
    name: "James Wilson",
    avatar: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    status: "online",
    location: "Chicago, IL",
    work: "Marketing Manager at Brand Inc",
    education: "Business Administration, Northwestern",
    joinDate: "June 2020",
    mutualFriends: 4,
    isFriend: false,
    about: "Marketing professional with a love for music, sports, and good food. Always up for networking and new opportunities.",
    photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    friends: [
      { id: 4, name: "Emily Chen", avatar: "/placeholder.svg" },
      { id: 6, name: "Jessica Lee", avatar: "/placeholder.svg" },
    ]
  }
};

const Person = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("posts");
  
  // Find the person based on the ID
  const person = people[Number(id)];

  if (!person) {
    return (
      <div className="min-h-screen bg-facebook-light">
        <Header />
        <div className="pt-14 flex">
          <LeftSidebar />
          <div className="flex-1 p-4 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Person Not Found</h2>
                <p className="text-gray-500">The person you're looking for doesn't exist or has been removed.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-facebook-light">
      <Header />
      <div className="pt-14 flex">
        <LeftSidebar />
        <div className="flex-1">
          {/* Cover Photo and Profile Section */}
          <div className="relative">
            <div className="h-64 w-full bg-gray-200 overflow-hidden">
              <img 
                src={person.coverImage} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="max-w-4xl mx-auto px-4 relative">
              {/* Profile Photo and Name */}
              <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:pb-4">
                <Avatar className="h-36 w-36 border-4 border-white bg-white">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{person.name}</h1>
                  <p className="text-gray-500 mt-1">{person.mutualFriends} mutual friends</p>
                </div>
                
                <div className="flex mt-4 md:mt-0 md:ml-auto gap-2">
                  {person.isFriend ? (
                    <>
                      <Button variant="default" className="bg-facebook-primary">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline">
                        <UserMinus className="h-4 w-4 mr-2" />
                        Unfriend
                      </Button>
                    </>
                  ) : (
                    <Button variant="default" className="bg-facebook-primary">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <Tabs
                defaultValue="posts"
                value={activeTab}
                onValueChange={setActiveTab}
                className="mt-6"
              >
                <TabsList className="w-full border-b border-gray-200 mb-4 pb-2">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="friends">Friends</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>
                
                {/* Posts Tab */}
                <TabsContent value="posts" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-center text-gray-500">No posts to show.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* About Tab */}
                <TabsContent value="about" className="mt-4 space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <h3 className="text-lg font-semibold">About</h3>
                    </CardHeader>
                    <CardContent>
                      <p>{person.about}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <h3 className="text-lg font-semibold">Details</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Lives in <strong>{person.location}</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Works at <strong>{person.work}</strong></span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Studied at <strong>{person.education}</strong></span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Joined <strong>{person.joinDate}</strong></span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Friends Tab */}
                <TabsContent value="friends" className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <h3 className="text-lg font-semibold">{person.friends.length} Friends</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {person.friends.map(friend => (
                          <div key={friend.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={friend.avatar} alt={friend.name} />
                              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <h4 className="font-medium">{friend.name}</h4>
                              <Button variant="ghost" size="sm" className="mt-1">
                                <UserCheck className="h-4 w-4 mr-1" />
                                Friends
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Photos Tab */}
                <TabsContent value="photos" className="mt-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <h3 className="text-lg font-semibold">{person.photos.length} Photos</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {person.photos.map((photo, index) => (
                          <div key={index} className="aspect-square overflow-hidden rounded-lg">
                            <img 
                              src={photo} 
                              alt={`${person.name}'s photo ${index + 1}`} 
                              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Person;
