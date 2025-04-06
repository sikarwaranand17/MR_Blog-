
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/services/postService";
import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-medium">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <User className="h-3 w-3" /> {post.author}
        </CardDescription>
        <div className="flex items-center text-xs text-muted-foreground gap-2">
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0">
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
