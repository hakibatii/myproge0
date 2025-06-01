
import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export type BadgeType = "organizer" | "verified_organizer" | "company" | null;

interface VerificationBadgeProps {
  type: BadgeType;
  className?: string;
}

const VerificationBadge = ({ type, className = "" }: VerificationBadgeProps) => {
  const { t } = useLanguage();
  
  if (!type) return null;
  
  let label = "";
  let color = "";
  
  switch (type) {
    case "organizer":
      label = t("organizer");
      color = "bg-morocco-turquoise text-white";
      break;
    case "verified_organizer":
      label = t("verified_organizer");
      color = "bg-morocco-gold text-white";
      break;
    case "company":
      label = t("company");
      color = "bg-purple-600 text-white";
      break;
    default:
      return null;
  }
  
  return (
    <Badge className={`flex items-center gap-1 px-2 py-1 ${color} ${className}`}>
      <BadgeCheck className="h-3 w-3" />
      <span className="text-xs">{label}</span>
    </Badge>
  );
};

export default VerificationBadge;
