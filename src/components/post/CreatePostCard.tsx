
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Video, Smile } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function CreatePostCard({ onPostCreated }: { onPostCreated?: (post: any) => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast({
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      content: postContent,
      author: "You",
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      isLiked: false,
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    setPostContent("");
    setIsDialogOpen(false);
    
    toast({
      description: "Post created successfully!",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-500 bg-facebook-light hover:bg-gray-200 rounded-full h-10"
            >
              What's on your mind?
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-center">Create Post</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 mb-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Your Name</p>
              </div>
            </div>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] resize-none"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="bg-white rounded-lg p-3 border mt-3 flex justify-between items-center">
              <span className="text-sm font-medium">Add to your post</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image className="w-5 h-5 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Video className="w-5 h-5 text-facebook-primary" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Smile className="w-5 h-5 text-yellow-500" />
                </Button>
              </div>
            </div>
            <Button 
              className="w-full bg-facebook-primary hover:bg-facebook-hover"
              onClick={handleCreatePost}
              disabled={!postContent.trim()}
            >
              Post
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-2 border-t pt-3">
        <Button variant="ghost" className="rounded-md">
          <Video className="h-5 w-5 mr-2 text-red-500" />
          <span className="text-gray-600">Live Video</span>
        </Button>
        <Button variant="ghost" className="rounded-md">
          <Image className="h-5 w-5 mr-2 text-green-500" />
          <span className="text-gray-600">Photo/video</span>
        </Button>
        <Button variant="ghost" className="rounded-md">
          <Smile className="h-5 w-5 mr-2 text-yellow-500" />
          <span className="text-gray-600">Feeling</span>
        </Button>
      </div>
    </div>
  );
}
