import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { UpgradeFormData, SubscriptionType } from "./upgrade/types";
import FormHeader from "./upgrade/FormHeader";
import ProgressBar from "./upgrade/ProgressBar";
import SubscriptionStep from "./upgrade/SubscriptionStep";
import IdDocumentsStep from "./upgrade/IdDocumentsStep";
import SelfieStep from "./upgrade/SelfieStep";

const UpgradeForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType>("basic");
  const [formData, setFormData] = useState<UpgradeFormData>({
    idFront: null,
    idBack: null,
    selfie: null,
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    acceptTerms: false,
    subscriptionType: "basic"
  });

  const updateFormData = (field: keyof UpgradeFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const nextStep = () => {
    if (step === 0) {
      updateFormData('subscriptionType', subscriptionType);
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let planName = "";
    switch (subscriptionType) {
      case "basic":
        planName = t("free_package");
        break;
      case "premium":
        planName = t("basic_package");
        break;
      case "professional":
        planName = t("pro_package");
        break;
      case "enterprise":
        planName = t("enterprise_package");
        break;
    }

    console.log("Form data:", formData);
    console.log("Subscription type:", subscriptionType);

    toast({
      title: t("upgrade_success"),
      description: t("upgrade_success_desc"),
    });

    try {
      const userJson = localStorage.getItem("currentUser");
      if (userJson) {
        const user = JSON.parse(userJson);
        user.isVerified = true;
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.setItem("currentUser", JSON.stringify({ isVerified: true }));
      }
    } catch (e) {
      console.error("Failed to update user verification status", e);
    }

    navigate("/account");
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SubscriptionStep
            formData={formData}
            subscriptionType={subscriptionType}
            setSubscriptionType={setSubscriptionType}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <IdDocumentsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <SelfieStep
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container bg-gray-50 dark:bg-morocco-navy/90 pb-20">
      <FormHeader title={t("upgrade_to_organizer")} backLink="/account" />
      <div className="p-4">
        <ProgressBar currentStep={step} totalSteps={3} />
        {renderStep()}
      </div>
    </div>
  );
};

export default UpgradeForm;