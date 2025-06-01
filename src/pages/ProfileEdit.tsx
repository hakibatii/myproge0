
import { ChevronRight, Save, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

// Import refactored components
import ProfileHeaderSection from "@/components/profile/ProfileHeaderSection";
import PhoneVerificationField from "@/components/profile/PhoneVerificationField";
import BackgroundColorSelector from "@/components/profile/BackgroundColorSelector";
import { useProfileEdit } from "@/hooks/useProfileEdit";
import { ChangeEvent } from "react";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    profile,
    backgroundColors,
    cities,
    handleChange,
    handleGenderChange,
    handleCityChange,
    handleBackgroundColorChange,
    handleAvatarChange,
    handleBackgroundChange,
    handleSubmit,
    handleVerifyPhone,
  } = useProfileEdit();

  // Create wrapper functions to bridge type gap for image handlers
  const handleAvatarChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          handleAvatarChange(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleBackgroundChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          handleBackgroundChange(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate("/account")} className="mr-4">
          <ChevronRight className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold flex-1 rtl">{t("edit_profile")}</h1>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => navigate("/account")}
            size="sm"
            variant="outline"
            className="border-gray-300"
          >
            <Home className="h-4 w-4 mr-1" />
            <span className="rtl">{t("account")}</span>
          </Button>
          <Button 
            onClick={handleSubmit}
            size="sm"
            className="bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white"
          >
            <Save className="h-4 w-4 mr-1" />
            <span className="rtl">{t("save")}</span>
          </Button>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture and Background Section */}
          <ProfileHeaderSection
            avatar={profile.avatar}
            name={profile.name}
            background={profile.background}
            onAvatarChange={handleAvatarChangeWrapper}
            onBackgroundChange={handleBackgroundChangeWrapper}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium rtl">{t("name")}</label>
            <Input 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
              className="rtl text-right"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium rtl">{t("gender")}</label>
            <Select onValueChange={handleGenderChange} defaultValue={profile.gender}>
              <SelectTrigger className="rtl text-right">
                <SelectValue placeholder={t("gender")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male" className="rtl text-right">{t("male")}</SelectItem>
                <SelectItem value="female" className="rtl text-right">{t("female")}</SelectItem>
                <SelectItem value="other" className="rtl text-right">{t("other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium rtl">{t("age")}</label>
            <Input 
              name="age" 
              type="number" 
              value={profile.age} 
              onChange={handleChange}
              className="rtl text-right"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium rtl">{t("city")}</label>
            <Select onValueChange={handleCityChange} defaultValue={profile.city}>
              <SelectTrigger className="rtl text-right">
                <SelectValue placeholder={t("city")} />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value} className="rtl text-right">
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <PhoneVerificationField
            phone={profile.phone}
            isVerified={profile.phoneVerified}
            onChange={handleChange}
            onVerify={handleVerifyPhone}
          />
          
          {/* Background color selection */}
          <BackgroundColorSelector
            colors={backgroundColors}
            currentBackground={profile.background}
            onColorSelect={handleBackgroundColorChange}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium rtl">{t("description")}</label>
            <Textarea 
              name="description" 
              value={profile.description} 
              onChange={handleChange}
              className="rtl text-right min-h-[100px]" 
              placeholder="اكتب نبذة عن نفسك..."
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-morocco-turquoise hover:bg-morocco-turquoise/90 text-white"
          >
            {t("save_changes")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
