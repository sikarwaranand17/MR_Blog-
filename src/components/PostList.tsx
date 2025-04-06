
import { useState, useEffect } from "react";
import { Post, getPosts } from "@/services/postService";
import PostCard from "./PostCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("q") || "";
  const activeTab = searchParams.get("category") || "all";
  const PAGE_SIZE = 9;

  useEffect(() => {
    setLoading(true);
    const { posts, totalPages } = getPosts(currentPage, PAGE_SIZE, searchQuery);
    
    // Filter by category if needed
    const filteredPosts = activeTab !== "all" 
      ? posts.filter(post => post.category === activeTab)
      : posts;
    
    setPosts(filteredPosts);
    setTotalPages(totalPages);
    setLoading(false);
  }, [currentPage, searchQuery, activeTab]);

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page.toString());
      return newParams;
    });
  };

  const handleSearch = (query: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (query) {
        newParams.set("q", query);
      } else {
        newParams.delete("q");
      }
      newParams.set("page", "1"); // Reset to first page on new search
      return newParams;
    });
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (category !== "all") {
        newParams.set("category", category);
      } else {
        newParams.delete("category");
      }
      newParams.set("page", "1"); // Reset page on category change
      return newParams;
    });
  };

  const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 rounded-lg bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">Mr Blog</h1>
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      </div>

      <Tabs value={activeTab} className="mb-8">
        <TabsList className="mb-4 w-full overflow-x-auto flex-wrap justify-start">
          <TabsTrigger 
            value="all" 
            onClick={() => handleCategoryChange("all")}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Posts
          </TabsTrigger>
          {uniqueCategories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              onClick={() => handleCategoryChange(category)}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium text-gray-600">No posts found</h2>
          <p className="mt-2 text-gray-500">Try a different search query or category</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
