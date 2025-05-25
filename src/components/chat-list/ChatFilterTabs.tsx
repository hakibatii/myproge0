
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatFilterTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ChatFilterTabs = ({ activeTab, setActiveTab }: ChatFilterTabsProps) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full mb-4"
    >
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="all" className="rtl">الكل</TabsTrigger>
        <TabsTrigger value="unread" className="rtl">غير مقروءة</TabsTrigger>
        <TabsTrigger value="direct" className="rtl">مباشرة</TabsTrigger>
        <TabsTrigger value="groups" className="rtl">مجموعات</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChatFilterTabs;
