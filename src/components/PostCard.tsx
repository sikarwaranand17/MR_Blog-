
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@/services/postService";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription>By {post.author} • {post.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={() => navigate(`/post/${post.id}`)}
          className="w-full"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
