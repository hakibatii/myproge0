
import Post from "@/components/Post";

interface User {
  id: string; // Added id property to match User interface
  name: string;
  avatar: string;
  isVerified: boolean;
}

interface PostType {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags?: string[];
}

interface PostsSectionProps {
  posts: PostType[];
  currentUser: {
    id: string;
    isVerified: boolean;
  };
}

const PostsSection = ({ posts, currentUser }: PostsSectionProps) => {
  return (
    <div className="mb-6">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          user={post.user}
          content={post.content}
          image={post.image}
          likes={post.likes}
          comments={post.comments}
          timestamp={post.timestamp}
          hashtags={post.hashtags || []}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default PostsSection;
