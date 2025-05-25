
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define the profile data structure
export interface ProfileData {
  name: string;
  gender: string;
  age: number;
  phone: string;
  city: string;
  description: string;
  backgroundColor: string;
  phoneVerified: boolean;
  avatar: string;
  background: string;
}

export const useProfileEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Background colors options
  const backgroundColors = [
    { name: "أزرق", value: "bg-blue-500" },
    { name: "أخضر", value: "bg-green-500" },
    { name: "أحمر", value: "bg-red-500" },
    { name: "برتقالي", value: "bg-orange-500" },
    { name: "أرجواني", value: "bg-purple-500" },
    { name: "وردي", value: "bg-pink-500" },
    { name: "رمادي", value: "bg-gray-500" },
  ];

  // Cities list - Expanded with more Moroccan cities
  const cities = [
    { name: "مراكش", value: "مراكش" },
    { name: "الدار البيضاء", value: "الدار البيضاء" },
    { name: "الرباط", value: "الرباط" },
    { name: "فاس", value: "فاس" },
    { name: "طنجة", value: "طنجة" },
    { name: "أكادير", value: "أكادير" },
    { name: "شفشاون", value: "شفشاون" },
    { name: "الصويرة", value: "الصويرة" },
    { name: "ورزازات", value: "ورزازات" },
    { name: "مكناس", value: "مكناس" },
    { name: "تطوان", value: "تطوان" },
    { name: "العيون", value: "العيون" },
    { name: "الداخلة", value: "الداخلة" },
    { name: "وجدة", value: "وجدة" },
    { name: "القنيطرة", value: "القنيطرة" },
    { name: "أصيلة", value: "أصيلة" },
    { name: "إفران", value: "إفران" },
    { name: "الجديدة", value: "الجديدة" },
    { name: "بني ملال", value: "بني ملال" },
    { name: "الحسيمة", value: "الحسيمة" },
    { name: "آسفي", value: "آسفي" },
    { name: "العرائش", value: "العرائش" },
    { name: "طنطان", value: "طنطان" },
    { name: "سلا", value: "سلا" },
    { name: "تازة", value: "تازة" },
    { name: "خريبكة", value: "خريبكة" },
    { name: "سطات", value: "سطات" },
    { name: "تارودانت", value: "تارودانت" },
    { name: "الناظور", value: "الناظور" },
    { name: "تيزنيت", value: "تيزنيت" },
    { name: "تيفلت", value: "تيفلت" },
    { name: "الخميسات", value: "الخميسات" },
    { name: "الراشيدية", value: "الراشيدية" },
    { name: "الصخيرات", value: "الصخيرات" },
    { name: "تاوريرت", value: "تاوريرت" },
  ];
  
  // Initial profile state
  const [profile, setProfile] = useState<ProfileData>({
    name: "أحمد المهندي",
    gender: "male",
    age: 32,
    phone: "+966 4567 123 55 964",
    city: "مراكش",
    description: "مرشد سياحي متخصص في المناطق الجبلية والصحراوية في المغرب. أتحدث العربية والإنجليزية والفرنسية بطلاقة.",
    backgroundColor: "bg-morocco-turquoise",
    phoneVerified: false,
    avatar: "/lovable-uploads/245c3862-513e-4924-9fd5-d22ddd517614.png",
    background: "linear-gradient(45deg, #1E3A8A, #7E22CE)"
  });

  // Load user data from localStorage
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          const user = JSON.parse(userJson);
          setProfile(prev => ({
            ...prev,
            name: user.name || prev.name,
            phone: user.phone || prev.phone,
            city: user.city || prev.city,
            description: user.description || prev.description,
            phoneVerified: user.phoneVerified || false,
            avatar: user.avatar || prev.avatar,
            background: user.background || prev.background
          }));
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error);
      }
    }
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle gender selection
  const handleGenderChange = (value: string) => {
    setProfile({
      ...profile,
      gender: value,
    });
  };
  
  // Handle city selection
  const handleCityChange = (value: string) => {
    setProfile({
      ...profile,
      city: value,
    });
  };
  
  // Handle background color change
  const handleBackgroundColorChange = (value: string) => {
    setProfile({
      ...profile,
      background: value,
    });
  };
  
  // Handle avatar change - accepts both string and file input event
  const handleAvatarChange = (imageUrlOrEvent: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof imageUrlOrEvent === 'string') {
      // Case when direct URL is provided
      setProfile({
        ...profile,
        avatar: imageUrlOrEvent
      });
    } else if (imageUrlOrEvent.target.files && imageUrlOrEvent.target.files[0]) {
      // Case when input event is provided
      const file = imageUrlOrEvent.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      setProfile({
        ...profile,
        avatar: imageUrl
      });
    }
  };
  
  // Handle background image change - accepts both string and file input event
  const handleBackgroundChange = (backgroundUrlOrEvent: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof backgroundUrlOrEvent === 'string') {
      // Case when direct URL is provided
      setProfile({
        ...profile,
        background: backgroundUrlOrEvent
      });
    } else if (backgroundUrlOrEvent.target.files && backgroundUrlOrEvent.target.files[0]) {
      // Case when input event is provided
      const file = backgroundUrlOrEvent.target.files[0];
      const backgroundUrl = URL.createObjectURL(file);
      
      setProfile({
        ...profile,
        background: backgroundUrl
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user in localStorage
    if (typeof localStorage !== 'undefined') {
      try {
        const userJson = localStorage.getItem("currentUser");
        if (userJson) {
          const user = JSON.parse(userJson);
          user.name = profile.name;
          user.phone = profile.phone;
          user.city = profile.city;
          user.description = profile.description;
          user.avatar = profile.avatar;
          user.background = profile.background;
          localStorage.setItem("currentUser", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Error updating user data in localStorage:", error);
      }
    }
    
    // Show success toast and navigate back to account
    toast({
      title: "تم حفظ التغييرات",
      description: "تم تحديث الملف الشخصي بنجاح",
    });
    
    navigate("/account");
  };
  
  // Handle phone verification
  const handleVerifyPhone = () => {
    // Store phone in session storage to be accessed by the verification page
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem("verifyPhone", profile.phone);
    }
    
    navigate("/verify-phone");
  };

  return {
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
  };
};
