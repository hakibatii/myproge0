
import Post from "@/components/Post";
import PostsLoading from "./PostsLoading";
import { PostType, CurrentUser } from "./types/post-types";

interface FilteredPostsListProps {
  posts: PostType[];
  loading: boolean;
  currentUser: CurrentUser;
}

const FilteredPostsList = ({ posts, loading, currentUser }: FilteredPostsListProps) => {
  if (loading) {
    return <PostsLoading />;
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
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

export default FilteredPostsList;
