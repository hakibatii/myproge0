import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SubscriptionType, UpgradeFormData } from "./types";
import { useLanguage } from "@/contexts/LanguageContext";
import { BadgeCheck, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface SubscriptionStepProps {
  formData: UpgradeFormData;
  subscriptionType: SubscriptionType;
  setSubscriptionType: (type: SubscriptionType) => void;
  updateFormData: (field: keyof UpgradeFormData, value: any) => void;
  nextStep: () => void;
}

const SubscriptionStep = ({
  formData,
  subscriptionType,
  setSubscriptionType,
  updateFormData,
  nextStep
}: SubscriptionStepProps) => {
  const { t } = useLanguage();
  const carouselRef = useRef<any>(null);

  const handleTermsChange = (checked: boolean) => {
    updateFormData("acceptTerms", checked);
  };

  const isFormValid = () => {
    return formData.acceptTerms;
  };

  const handleScrollPrev = () => {
    if (carouselRef.current) carouselRef.current.scrollPrev();
  };

  const handleScrollNext = () => {
    if (carouselRef.current) carouselRef.current.scrollNext();
  };

  const subscriptionPlans = [
    {
      id: "basic",
      name: t("free_package_name"),
      price: "0",
      description: t("no_monthly_fee"),
      features: [
        { text: "إنشاء 3 رحلات شهريًا", included: true },
        { text: "رفع 10 صور للرحلة", included: true },
        { text: "رفع صورة للرحلة", included: true },
        { text: "الحصول على شارة منظم موثوق", included: false },
        { text: "ارسال رسائل للمنظمين الآخرين", included: false },
        { text: "اشعارات للعروض", included: false },
      ],
      popular: false
    },
    {
      id: "premium",
      name: t("basic_package_name"),
      price: "150",
      description: t("first_month_free"),
      features: [
        { text: "إنشاء رحلات غير محدودة", included: true },
        { text: "رفع 30 صورة للرحلة", included: true },
        { text: "ارسال رسائل للمنظمين الآخرين", included: true },
        { text: "الحصول على شارة منظم موثوق", included: true },
        { text: "ظهور محدود في نتائج البحث", included: true },
        { text: "اشعارات للعروض", included: false },
        { text: "تصدر محركات البحث", included: false },
      ],
      popular: true
    },
    {
      id: "professional",
      name: t("pro_package_name"),
      price: "249",
      description: t("first_month_free"),
      features: [
        { text: "جميع المميزات الأساسية", included: true },
        { text: "إضافة موقع شركتك على الخريطة", included: true },
        { text: "الحصول على شارة منظم موثوق", included: true },
        { text: "ارسال رسائل لأي منظم أو مستخدم", included: true },
        { text: "تصدر محركات البحث", included: true },
        { text: "تحليلات متقدمة", included: true },
        { text: "بدون إعلانات", included: true },
      ],
      popular: false
    },
    {
      id: "enterprise",
      name: t("enterprise_package_name"),
      price: "449",
      description: t("first_month_free"),
      features: [
        { text: "جميع المميزات الأساسية", included: true },
        { text: "إضافة موقع شركتك على الخريطة", included: true },
        { text: "الحصول على شارة الشركات", included: true },
        { text: "اشعارات للمستخدمين برحلات الجديدة", included: true },
        { text: "تصدر محركات البحث", included: true },
        { text: "تحليلات متقدمة", included: true },
        { text: "بدون إعلانات", included: true },
      ],
      popular: false
    }
  ] as const;

  const selectedPlan = subscriptionPlans.find(p => p.id === subscriptionType);
  const isFreePlan = selectedPlan?.price === "0";

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold rtl">{t("subscription_title")}</h2>
        <p className="text-sm text-gray-500 rtl">{t("subscription_subtitle")}</p>
        <div className="mt-2 text-morocco-gold rtl text-sm">
          <p>← اسحب لرؤية المزيد من الباقات →</p>
        </div>
      </div>

      <div className="relative px-4">
        <Carousel ref={carouselRef} className="w-full" opts={{ align: "start", loop: false }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {subscriptionPlans.map((plan) => (
              <CarouselItem key={plan.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className={cn(
                  "relative flex flex-col h-full rounded-xl overflow-hidden transition-all",
                  subscriptionType === plan.id 
                    ? "border-2 border-morocco-gold shadow-lg transform scale-[1.02]" 
                    : "border border-gray-200 dark:border-gray-700",
                  plan.popular && "bg-gradient-to-b from-orange-50 to-white dark:from-morocco-navy/30 dark:to-gray-900"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-morocco-gold text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                      الأكثر شعبية
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-1 rtl">{plan.name}</h3>
                    <p className="text-sm text-morocco-gold rtl mb-2">{plan.description}</p>
                    <div className="mt-2">
                      <p className="text-2xl font-bold rtl flex items-center">
                        {plan.price} <span className="text-sm font-normal mr-1">درهم / شهر</span>
                      </p>
                    </div>
                    <div className="mt-4 flex-grow">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center rtl text-sm">
                            {feature.included ? (
                              <span className="mr-2 text-green-500 flex-shrink-0"><Check className="h-4 w-4" /></span>
                            ) : (
                              <span className="mr-2 text-red-500 flex-shrink-0">✗</span>
                            )}
                            <span className={feature.included ? "" : "text-gray-400"}>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-5 pt-0 mt-auto">
                    <Button
                      onClick={() => setSubscriptionType(plan.id as SubscriptionType)}
                    >
                      {t("select_plan")}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="text-gray-500">
        {t("accept_terms_description")}
      </div>

      <div className="mt-4">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={handleTermsChange}
        >
          {t("accept_terms")}
        </Checkbox>
      </div>

      <div className="mt-4">
        <Button
          onClick={isFormValid() ? nextStep : undefined}
          disabled={!isFormValid()}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionStep;