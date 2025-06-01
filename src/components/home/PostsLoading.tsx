
import { Skeleton } from "@/components/ui/skeleton";

const PostsLoading = () => {
  return (
    <>
      {[1, 2].map(i => (
        <div key={i} className="bg-white dark:bg-morocco-navy rounded-xl shadow-sm mb-4 p-4">
          <div className="flex items-center mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="ml-3 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-40 w-full mb-4 rounded-md" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </>
  );
};

export default PostsLoading;
