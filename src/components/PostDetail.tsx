
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, Post } from "@/services/postService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const postId = parseInt(id);
      const fetchedPost = getPostById(postId);
      if (fetchedPost) {
        setPost(fetchedPost);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Back to Posts</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center text-gray-600 mb-8">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>
        
        <div className="aspect-video mb-8 overflow-hidden rounded-lg">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="prose max-w-none">
          {post.content.split('.').map((sentence, index) => (
            <p key={index} className="mb-4">
              {sentence.trim() + (index < post.content.split('.').length - 2 ? '.' : '')}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
