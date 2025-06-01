import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Post from "@/components/Post";
import TripCard from "@/components/TripCard";

interface User {
  id: string;
  name: string;
  avatar: string;
  isVerified?: boolean;
  // other user properties
}

interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  timestamp: string;
  hashtags: string[];
}

interface Trip {
  id: string;
  image: string;
  title: string;
  location: string;
  date: string;
  rating: number;
  originalPrice?: number;
  discountedPrice: number;
  currency: string;
  user: User;
}

interface UserProfileTabsProps {
  posts: Post[];
  trips: Trip[];
  currentUser: {
    id: string;
    isVerified: boolean;
  };
}

const UserProfileTabs = ({ posts, trips, currentUser }: UserProfileTabsProps) => {
  return (
    <div className="px-4 mt-4">
      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="posts" className="rtl">المنشورات</TabsTrigger>
          <TabsTrigger value="trips" className="rtl">الرحلات</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {posts.length > 0 ? (
            posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                user={post.user}
                content={post.content}
                image={post.image}
                video={post.video}
                likes={post.likes}
                comments={post.comments}
                timestamp={post.timestamp}
                hashtags={post.hashtags}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-morocco-navy rounded-xl p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 rtl">لا توجد منشورات بعد</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="trips">
          {trips.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {trips.map(trip => (
                <TripCard 
                  key={trip.id}
                  id={trip.id}
                  image={trip.image}
                  title={trip.title}
                  location={trip.location}
                  date={trip.date}
                  rating={trip.rating}
                  originalPrice={trip.originalPrice}
                  discountedPrice={trip.discountedPrice}
                  currency={trip.currency}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-morocco-navy rounded-xl p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 rtl">لا توجد رحلات بعد</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileTabs;
