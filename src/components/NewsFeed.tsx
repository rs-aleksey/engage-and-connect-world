
import { useState, useEffect } from "react";
import { CreatePostCard } from "./post/CreatePostCard";
import { Post, PostProps } from "./post/Post";
import { useToast } from "@/components/ui/use-toast";

// Initial sample posts
const initialPosts: PostProps[] = [
  {
    id: 1,
    author: "Mark Zuckerberg",
    content: "Excited to announce the next chapter for our company as we continue to build the metaverse and shape the internet's future!",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 142,
    comments: [
      {
        id: 101,
        author: "Jane Cooper",
        content: "This is incredible news! Looking forward to it.",
        timestamp: new Date(Date.now() - 3000000).toISOString(),
      },
    ],
    isLiked: false,
  },
  {
    id: 2,
    author: "Sarah Johnson",
    content: "Just finished my morning hike! The sunrise was absolutely breathtaking today. Who else is enjoying the great outdoors this weekend?",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    likes: 47,
    comments: [],
    isLiked: true,
  },
  {
    id: 3,
    author: "Tech Community",
    content: "The latest AI developments are changing how we approach software development. What are your thoughts on these advancements?",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 89,
    comments: [
      {
        id: 201,
        author: "Alex Miller",
        content: "I'm both excited and concerned about the implications for job markets.",
        timestamp: new Date(Date.now() - 80000000).toISOString(),
      },
      {
        id: 202,
        author: "Robin Chen",
        content: "The potential for healthcare applications is incredible.",
        timestamp: new Date(Date.now() - 75000000).toISOString(),
      },
    ],
    isLiked: false,
  },
];

export function NewsFeed() {
  const [posts, setPosts] = useState<PostProps[]>(initialPosts);
  const { toast } = useToast();

  const handleCreatePost = (newPost: PostProps) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="max-w-[680px] mx-auto px-4 py-4">
      <CreatePostCard onPostCreated={handleCreatePost} />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            {...post} 
            onDelete={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
}
