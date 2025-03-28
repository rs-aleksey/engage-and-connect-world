
import { Button } from "@/components/ui/button";
import { User, UserRoundSearch, Bookmark, Clock, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function LeftSidebar() {
  const shortcuts = [
    { name: "Friends", icon: <UserRoundSearch className="h-5 w-5 mr-3" />, path: "/friends" }, // Changed icon here
    { name: "Saved", icon: <Bookmark className="h-5 w-5 mr-3" />, path: "#" },
    { name: "Memories", icon: <Clock className="h-5 w-5 mr-3" />, path: "#" },
  ];

  const groups = [
    { name: "Tech Enthusiasts", avatar: "/placeholder.svg" },
    { name: "Hiking Adventures", avatar: "/placeholder.svg" },
    { name: "Book Club", avatar: "/placeholder.svg" },
  ];

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-[300px] hidden md:block p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* User Profile Shortcut */}
        <Button variant="ghost" className="w-full justify-start font-normal" asChild>
          <Link to="/profile" className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span>Your Name</span>
          </Link>
        </Button>

        {/* Shortcuts */}
        {shortcuts.map((shortcut) => (
          <Button 
            key={shortcut.name} 
            variant="ghost" 
            className="w-full justify-start font-normal" 
            asChild
          >
            <Link to={shortcut.path} className="flex items-center">
              {shortcut.icon}
              <span>{shortcut.name}</span>
            </Link>
          </Button>
        ))}

        <Button variant="ghost" className="w-full justify-start font-normal">
          <ChevronDown className="h-5 w-5 mr-3" />
          <span>See more</span>
        </Button>

        <div className="border-t border-gray-200 pt-4 mt-2">
          <h3 className="text-lg font-semibold mb-2 px-2">Your groups</h3>
          {groups.map((group) => (
            <Button 
              key={group.name} 
              variant="ghost" 
              className="w-full justify-start font-normal" 
              asChild
            >
              <a href="#" className="flex items-center">
                <Avatar className="h-9 w-9 mr-3">
                  <AvatarImage src={group.avatar} alt={group.name} />
                  <AvatarFallback>{group.name[0]}</AvatarFallback>
                </Avatar>
                <span>{group.name}</span>
              </a>
            </Button>
          ))}

          <Button variant="ghost" className="w-full justify-start font-normal">
            <ChevronDown className="h-5 w-5 mr-3" />
            <span>See more</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
