
import { MessageCircle } from "lucide-react";

const EmptyComments = () => {
  return (
    <div className="p-8 text-center">
      <MessageCircle className="mx-auto h-12 w-12 text-gray-300" />
      <p className="mt-2 text-gray-500 rtl">لا توجد تعليقات حتى الآن</p>
      <p className="text-sm text-gray-400 rtl">كن أول من يعلق!</p>
    </div>
  );
};

export default EmptyComments;
