
import { useState } from "react";
import { Share2, Copy, CheckCircle2, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ReferralInfo } from "@/components/chat/types";

interface ReferralCodeCardProps {
  referralInfo: ReferralInfo;
}

const ReferralCodeCard = ({ referralInfo }: ReferralCodeCardProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const referralUrl = `${window.location.origin}?ref=${referralInfo.code}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط الإحالة إلى الحافظة",
    });
    
    setTimeout(() => setCopied(false), 3000);
  };
  
  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'انضم إلينا واحصل على مكافأة!',
          text: 'استخدم رمز الإحالة الخاص بي للانضمام إلى تطبيق السفر المميز',
          url: referralUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="border-morocco-gold/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="rtl text-morocco-gold flex items-center">
              <Users size={20} className="ml-2" />
              دعوة الأصدقاء
            </CardTitle>
            <CardDescription className="rtl mt-1">
              احصل على 3 نقاط لكل صديق يستخدم رمز الإحالة الخاص بك
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-morocco-sand/10 border border-morocco-gold/20 rounded-lg p-3 mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-300 rtl mb-1">رمز الإحالة الخاص بك:</p>
          <div className="flex items-center justify-between">
            <code className="text-morocco-gold font-bold text-lg">{referralInfo.code}</code>
            <Button 
              size="sm" 
              variant="outline"
              className="border-morocco-gold text-morocco-gold hover:text-morocco-gold/90"
              onClick={copyToClipboard}
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="rtl">تم استخدام الرمز: {referralInfo.usedCount} مرة</span>
          <span className="rtl">النقاط المكتسبة: {referralInfo.pointsEarned}</span>
        </div>
        
        <Button 
          className="w-full bg-morocco-gold hover:bg-morocco-gold/90 rtl" 
          onClick={shareReferralLink}
        >
          <Share2 size={16} className="mr-2" />
          مشاركة الرابط مع الأصدقاء
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReferralCodeCard;
