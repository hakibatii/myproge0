import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { UpgradeFormData } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { detectFace, verifyFaces } from "@/services/faceApiService"; // استيراد خدمات Azure

interface SelfieStepProps {
  formData: UpgradeFormData;
  updateFormData: (field: keyof UpgradeFormData, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const SelfieStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep
}: SelfieStepProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [processing, setProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (showCamera && videoRef.current) {
      const checkForFace = async () => {
        setProcessing(true);
        try {
          // نلتقط صورة مؤقتة من الفيديو
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = videoRef.current!.videoWidth;
          tempCanvas.height = videoRef.current!.videoHeight;
          const ctx = tempCanvas.getContext("2d");
          if (!ctx) throw new Error("Cannot get canvas context");
          ctx.drawImage(videoRef.current!, 0, 0);
          const imageBase64 = tempCanvas.toDataURL("image/jpeg");

          // نستخدم دالة اكتشاف الوجه
          const faceId = await detectFace(imageBase64);
          if (faceId) {
            setFaceDetected(true);
            toast({
              title: t("face_detected") || "تم التعرف على الوجه",
              description: t("face_detected_desc") || "تم التعرف على وجهك بنجاح. يمكنك الآن التقاط الصورة.",
            });
          } else {
            setFaceDetected(false);
          }
        } catch (error) {
          console.error(error);
          setFaceDetected(false);
        }
        setProcessing(false);
      };

      if (videoRef.current.readyState >= 2) {
        checkForFace();
      } else {
        videoRef.current.onloadeddata = checkForFace;
      }
    }
  }, [showCamera, toast, t]);

  const startCamera = async () => {
    setShowCamera(true);
    setFaceDetected(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: t("error") || "خطأ",
        description: t("camera_access_error") || "لا يمكن الوصول إلى الكاميرا. يرجى التحقق من الإذونات.",
        variant: "destructive"
      });
      setShowCamera(false);
    }
  };

  const takePicture = async () => {
    if (!faceDetected) {
      toast({
        title: t("face_not_detected") || "لم يتم التعرف على الوجه",
        description: t("face_not_visible") || "يرجى التأكد من أن وجهك مرئي بوضوح في الكاميرا.",
        variant: "destructive"
      });
      return;
    }

    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (!context) return;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      setProcessing(true);
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const selfieFile = new File([blob], "selfie.jpg", { type: "image/jpeg" });
          updateFormData("selfie", selfieFile);

          // التحقق عبر Azure Face API
          try {
            // نفترض أن formData.idFront و idBack هما ملفات صور البطاقة (مرفوعة سابقًا)
            if (!formData.idFront) {
              toast({
                title: t("id_card_missing") || "صورة البطاقة غير موجودة",
                description: t("please_upload_id_card") || "يرجى رفع صورة البطاقة قبل التحقق.",
                variant: "destructive"
              });
              setProcessing(false);
              return;
            }

            // نحصل على base64 من صور البطاقة (نفترض وجود دالة لتحويل الملف إلى base64)
            const idFrontBase64 = await fileToBase64(formData.idFront);
            const selfieBase64 = await fileToBase64(selfieFile);

            const faceIdCard = await detectFace(idFrontBase64);
            const faceIdSelfie = await detectFace(selfieBase64);

            if (faceIdCard && faceIdSelfie) {
              const verified = await verifyFaces(faceIdCard, faceIdSelfie);
              if (verified) {
                toast({
                  title: t("verification_success") || "تم التحقق بنجاح",
                  description: t("face_matched") || "تم مطابقة صورتك مع صورة البطاقة بنجاح.",
                });
                stopCamera();
                nextStep();
              } else {
                toast({
                  title: t("verification_failed") || "فشل التحقق",
                  description: t("face_not_matched") || "صورة السيلفي لا تطابق صورة البطاقة.",
                  variant: "destructive"
                });
              }
            } else {
              toast({
                title: t("face_detection_failed") || "فشل اكتشاف الوجه",
                description: t("unable_to_detect_face") || "تعذر اكتشاف الوجه في إحدى الصور.",
                variant: "destructive"
              });
            }
          } catch (error) {
            console.error(error);
            toast({
              title: t("verification_error") || "خطأ في التحقق",
              description: t("try_again_later") || "حدث خطأ أثناء التحقق، حاول لاحقًا.",
              variant: "destructive"
            });
          } finally {
            setProcessing(false);
          }
        }
      }, "image/jpeg");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setFaceDetected(false);
  };

  // دالة لتحويل ملف إلى Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    // ... باقي الكود كما هو، بدون تغيير (عرض الفيديو، الأزرار، الرسائل)
  );
};

export default SelfieStep;