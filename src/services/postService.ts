
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
}

// Mock data for our posts
const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}: ${['Web Development Tips', 'React Best Practices', 'UX Design Principles', 'Frontend Frameworks', 'Backend Technologies'][i % 5]}`,
  content: `This is the content for post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  author: `Author ${(i % 5) + 1}`,
  date: new Date(Date.now() - (i * 86400000)).toLocaleDateString(),
  image: `/placeholder.svg`,
  excerpt: `This is a short excerpt for post ${i + 1}. Lorem ipsum dolor sit amet...`,
}));

export const getPosts = (page: number = 1, pageSize: number = 10, searchQuery: string = ''): { 
  posts: Post[]; 
  totalPosts: number;
  totalPages: number;
} => {
  let filteredPosts = mockPosts;
  
  // Filter posts based on search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = mockPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  
  return {
    posts: paginatedPosts,
    totalPosts: filteredPosts.length,
    totalPages
  };
};

export const getPostById = (id: number): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};
