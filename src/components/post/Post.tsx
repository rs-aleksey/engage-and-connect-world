import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal, Send } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
export interface PostComment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}
export interface PostProps {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: PostComment[];
  isLiked: boolean;
  onDelete?: (id: number) => void;
}
export function Post({
  id,
  author,
  content,
  timestamp,
  likes,
  comments: initialComments,
  isLiked: initialIsLiked,
  onDelete
}: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<PostComment[]>(initialComments);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(likes);
  const {
    toast
  } = useToast();
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true
  });
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: PostComment = {
      id: Date.now(),
      author: "You",
      content: newComment,
      timestamp: new Date().toISOString()
    };
    setComments([...comments, comment]);
    setNewComment("");
  };
  const handleDeletePost = () => {
    if (onDelete) {
      onDelete(id);
      toast({
        description: "Post deleted successfully"
      });
    }
  };
  return <div className="post-card mb-4 overflow-hidden">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="/placeholder.svg" alt={author} />
              <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{author}</h3>
              <p className="text-xs text-gray-500">{formattedTime}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDeletePost} className="text-red-600 cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Post Content */}
        <div className="mb-3">
          <p className="text-gray-800 text-base">{content}</p>
        </div>
        
        {/* Post Stats */}
        {(likesCount > 0 || comments.length > 0) && <div className="flex justify-between text-sm text-gray-500 py-2 border-b border-t">
            {likesCount > 0 && <div className="flex items-center">
                <div className="bg-facebook-primary text-white rounded-full p-1 mr-2">
                  <ThumbsUp className="h-3 w-3" />
                </div>
                {likesCount}
              </div>}
            
            {comments.length > 0 && <button onClick={() => setShowComments(true)} className="hover:underline">
                {comments.length} comment{comments.length !== 1 ? 's' : ''}
              </button>}
          </div>}
        
        {/* Post Actions */}
        <div className="flex justify-between pt-1">
          <Button variant="ghost" className={`flex-1 ${isLiked ? 'text-facebook-primary' : ''}`} onClick={handleLike}>
            <ThumbsUp className="h-5 w-5 mr-2" />
            Like
          </Button>
          
          <Button variant="ghost" className="flex-1" onClick={() => setShowComments(!showComments)}>
            <MessageSquare className="h-5 w-5 mr-2" />
            Comment
          </Button>
          
          <Button variant="ghost" className="flex-1">
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      {/* Comments Section */}
      {showComments && <div className="bg-gray-50 p-4">
          {/* Comment List */}
          {comments.length > 0 && <div className="space-y-3 mb-3">
              {comments.map(comment => <div key={comment.id} className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={comment.author} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-white rounded-2xl px-3 py-2 flex-1">
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>)}
            </div>}
          
          {/* Add Comment */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="You" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center bg-white rounded-full pr-2">
              <Input type="text" placeholder="Write a comment..." className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddComment();
            }
          }} />
              <Button variant="ghost" size="icon" onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 text-facebook-primary" />
              </Button>
            </div>
          </div>
        </div>}
    </div>;
}