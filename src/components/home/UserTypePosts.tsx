
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FilteredPostsList from "./FilteredPostsList";
import { usePostsFiltering } from "./hooks/usePostsFiltering";
import { CurrentUser } from "./types/post-types";

interface UserTypePostsProps {
  currentUser: CurrentUser;
}

const UserTypePosts = ({ currentUser }: UserTypePostsProps) => {
  const { t } = useLanguage();
  const { activeTab, loading, filteredPosts, handleTabChange } = usePostsFiltering();

  return (
    <div className="mt-4">
      <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all" className="rtl">{t("all_posts")}</TabsTrigger>
          <TabsTrigger value="travelers" className="rtl">{t("travelers")}</TabsTrigger>
          <TabsTrigger value="organizers" className="rtl">{t("organizers")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <FilteredPostsList 
            posts={filteredPosts}
            loading={loading}
            currentUser={currentUser}
          />
        </TabsContent>
        
        <TabsContent value="travelers" className="space-y-4">
          <FilteredPostsList 
            posts={filteredPosts}
            loading={loading}
            currentUser={currentUser}
          />
        </TabsContent>
        
        <TabsContent value="organizers" className="space-y-4">
          <FilteredPostsList 
            posts={filteredPosts}
            loading={loading}
            currentUser={currentUser}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserTypePosts;
