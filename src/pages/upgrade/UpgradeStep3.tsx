// src/pages/upgrade/UpgradeStep3.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { detectFace, verifyFaces } from '../../services/faceApiService';

const UpgradeStep3 = () => {
  const { t } = useLanguage();
  const [livePhoto, setLivePhoto] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const captureLivePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const base64Image = canvas.toDataURL('image/jpeg', 0.7);
      setLivePhoto(base64Image);
      
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error capturing photo:', error);
      alert(t('error_capturing_photo'));
    }
  };

  const handleVerify = async () => {
    if (!livePhoto) {
      alert(t('please_capture_face_first'));
      return;
    }

    setIsVerifying(true);

    try {
      const faceId1 = await detectFace(livePhoto);
      const idPhoto = localStorage.getItem('id_photo');
      
      if (!idPhoto) {
        alert(t('id_photo_not_found'));
        setIsVerifying(false);
        return;
      }

      const faceId2 = await detectFace(idPhoto);

      if (faceId1 && faceId2) {
        const isMatch = await verifyFaces(faceId1, faceId2);
        alert(
          isMatch ? t('verification_success') : t('verification_failed')
        );
      } else {
        alert(t('face_not_found'));
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert(t('verification_error'));
    }

    setIsVerifying(false);
  };

  return (
    <div className="p-5 space-y-4">
      <h2 className="text-xl font-bold mb-4">{t('step_3_face_verification')}</h2>

      <Button onClick={captureLivePhoto}>
        {t('capture_face_photo')}
      </Button>

      {livePhoto && (
        <div className="mt-4">
          <img
            src={livePhoto}
            alt="Captured face"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <Button 
        onClick={handleVerify} 
        disabled={isVerifying}
        className="mt-4"
      >
        {isVerifying ? t('verifying') : t('verify_match')}
      </Button>
    </div>
  );
};

export default UpgradeStep3;