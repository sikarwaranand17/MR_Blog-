
import { useState, useEffect } from "react";
import { Post, getPosts } from "@/services/postService";
import PostCard from "./PostCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("q") || "";
  const PAGE_SIZE = 9;

  useEffect(() => {
    setLoading(true);
    const { posts, totalPages } = getPosts(currentPage, PAGE_SIZE, searchQuery);
    setPosts(posts);
    setTotalPages(totalPages);
    setLoading(false);
  }, [currentPage, searchQuery]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium text-gray-600">No posts found</h2>
          <p className="mt-2 text-gray-500">Try a different search query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
