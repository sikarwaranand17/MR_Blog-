
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, getRelatedPosts, Post } from "@/services/postService";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CalendarIcon, User } from "lucide-react";
import PostCard from "./PostCard";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const postId = parseInt(id);
      const fetchedPost = getPostById(postId);
      
      if (fetchedPost) {
        setPost(fetchedPost);
        // Get related posts by category
        const related = getRelatedPosts(fetchedPost.category, postId);
        setRelatedPosts(related);
      }
      
      setLoading(false);
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-80 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-8 w-1/2"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
          ))}
        </div>
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
    <div className="container mx-auto py-12 px-4">
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
      </Button>
      
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" /> {post.author}
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" /> {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readTime}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden mb-10">
          <AspectRatio ratio={16 / 9}>
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {post.content.split('.').map((sentence, index) => {
            if (!sentence.trim()) return null;
            return (
              <p key={index} className="mb-6">
                {sentence.trim() + (index < post.content.split('.').length - 2 ? '.' : '')}
              </p>
            );
          })}
        </div>
        
        {/* Share buttons or tags could go here */}
        <div className="border-t border-gray-200 mt-12 pt-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          {relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No related posts found</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
