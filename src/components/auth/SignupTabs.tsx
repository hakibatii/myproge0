
import React from "react";
import { Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailSignupForm from "./EmailSignupForm";
import PhoneSignupForm from "./PhoneSignupForm";

interface SignupTabsProps {
  activeTab: "email" | "phone";
  setActiveTab: (tab: "email" | "phone") => void;
  isLoading: boolean;
  isOnline: boolean;
  handleEmailSignup: (name: string, email: string, password: string) => void;
  handlePhoneSignup: (name: string, phone: string, password: string) => void;
}

const SignupTabs = ({
  activeTab,
  setActiveTab,
  isLoading,
  isOnline,
  handleEmailSignup,
  handlePhoneSignup
}: SignupTabsProps) => {
  const { t } = useLanguage();

  return (
    <Tabs
      defaultValue="email"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "email" | "phone")}
      className="w-full"
    >
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger 
          value="email" 
          className="data-[state=active]:bg-[#d25f45] data-[state=active]:text-white"
        >
          <Mail className="h-4 w-4 mr-2" />
          {t("email") || "البريد الإلكتروني"}
        </TabsTrigger>
        <TabsTrigger 
          value="phone" 
          className="data-[state=active]:bg-[#d25f45] data-[state=active]:text-white"
        >
          <Phone className="h-4 w-4 mr-2" />
          {t("phoneNumber") || "رقم الهاتف"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="email" className="mt-0">
        <EmailSignupForm 
          isLoading={isLoading} 
          isOnline={isOnline} 
          onSubmit={handleEmailSignup} 
        />
      </TabsContent>
      
      <TabsContent value="phone" className="mt-0">
        <PhoneSignupForm 
          isLoading={isLoading} 
          isOnline={isOnline} 
          onSubmit={handlePhoneSignup} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default SignupTabs;
