
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentsPageParams } from "@/types/comment";

interface ContentPreviewProps {
  params: CommentsPageParams;
}

const ContentPreview = ({ params }: ContentPreviewProps) => {
  if (!params.contentPreview && !params.contentImage) {
    return null;
  }

  return (
    <Card className="mx-4 my-3">
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center">
          {params.userAvatar && (
            <div className="relative mr-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={params.userAvatar} alt={params.userName} />
                <AvatarFallback>{params.userName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              {params.userIsVerified && (
                <Badge className="absolute -bottom-1 -right-1 h-4 w-4 p-0 bg-blue-500 border-white border-2 flex items-center justify-center rounded-full">
                  <span className="text-[8px] text-white">✓</span>
                </Badge>
              )}
            </div>
          )}
          <div>
            <h3 className="font-semibold rtl text-sm">{params.userName || "مستخدم"}</h3>
            <p className="text-xs text-gray-500 rtl">
              {params.contentType === "post" ? "منشور" : "رحلة"}: {params.title}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {params.contentPreview && (
          <p className="text-sm rtl line-clamp-2 mb-2">{params.contentPreview}</p>
        )}
        {params.contentImage && (
          <div className="rounded-md overflow-hidden h-32">
            <img src={params.contentImage} alt="المحتوى" className="w-full h-full object-cover" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentPreview;
