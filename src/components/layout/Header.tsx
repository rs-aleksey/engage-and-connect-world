
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Home, MessageSquare, Search, User, Users, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        {/* Left Section - Logo & Search */}
        <div className="flex items-center gap-2 md:gap-4">
          <a href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-facebook-primary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">f</span>
            </div>
          </a>
          
          <div className="hidden md:flex relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="h-4 w-4" />
            </div>
            <Input
              type="text"
              placeholder="Search Facebook"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-9 rounded-full bg-facebook-light"
            />
          </div>
        </div>

        {/* Middle Section - Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex">
            <li>
              <Button variant="ghost" className="h-14 px-4" asChild>
                <a href="/" className="flex flex-col items-center">
                  <Home className="h-6 w-6 text-facebook-primary" />
                </a>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="h-14 px-4" asChild>
                <a href="/friends" className="flex flex-col items-center">
                  <Users className="h-6 w-6" />
                </a>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="h-14 px-4" asChild>
                <a href="/messages" className="flex flex-col items-center">
                  <MessageSquare className="h-6 w-6" />
                </a>
              </Button>
            </li>
          </ul>
        </nav>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        {/* Right Section - User Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
