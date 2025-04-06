
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  readTime: string;
}

// Get image based on category
const getCategoryImage = (category: string): string => {
  const images = {
    'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'React': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'UX Design': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'Frontend': 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'Backend': 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'Career': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'Technology': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    'Tools': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  };
  return images[category as keyof typeof images] || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
};

// Calculate read time
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Categories for posts
const categories = [
  'Web Development',
  'React',
  'UX Design',
  'Frontend',
  'Backend',
  'Career',
  'Technology',
  'Tools'
];

// Mock data for our posts
const mockPosts: Post[] = Array.from({ length: 50 }, (_, i) => {
  const category = categories[i % categories.length];
  const title = `${['Mastering', 'Understanding', 'Guide to', 'Deep Dive into', 'Exploring'][i % 5]} ${category}`;
  const content = `This is the content for post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
  
  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;
  
  return {
    id: i + 1,
    title: title,
    content: content,
    author: `${['Sarah', 'Michael', 'Jessica', 'David', 'Emma'][i % 5]} ${['Johnson', 'Smith', 'Williams', 'Brown', 'Jones'][i % 5]}`,
    date: new Date(Date.now() - (i * 86400000)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    image: getCategoryImage(category),
    excerpt: `Learn the essential concepts and best practices for ${category.toLowerCase()} in this comprehensive guide...`,
    category: category,
    readTime: calculateReadTime(content)
  };
});

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
      post.content.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
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

export const getRelatedPosts = (categoryName: string, currentPostId: number, limit: number = 3): Post[] => {
  return mockPosts
    .filter(post => post.category === categoryName && post.id !== currentPostId)
    .slice(0, limit);
};
