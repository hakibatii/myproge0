// src/services/faceApiService.ts

const FACE_API_ENDPOINT = import.meta.env.VITE_FACE_API_ENDPOINT;
const FACE_API_KEY = import.meta.env.VITE_FACE_API_KEY;

if (!FACE_API_ENDPOINT || !FACE_API_KEY) {
  throw new Error("بيانات Azure Face API مفقودة في .env");
}

const headers = {
  'Ocp-Apim-Subscription-Key': FACE_API_KEY,
};

// دالة لاكتشاف وجه في صورة وإرجاع faceId
export const detectFace = async (imageBase64: string): Promise<string | null> => {
  const url = ${FACE_API_ENDPOINT}face/v1.0/detect?returnFaceId=true;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/octet-stream',
      },
      body: convertBase64ToBlob(imageBase64),
    });

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0 && data[0].faceId) {
      return data[0].faceId;
    }

    return null;
  } catch (error) {
    console.error('Face detection error:', error);
    return null;
  }
};

// دالة للتحقق بين وجهين
export const verifyFaces = async (faceId1: string, faceId2: string): Promise<boolean> => {
  const url = ${FACE_API_ENDPOINT}face/v1.0/verify;

  const body = JSON.stringify({
    faceId1,
    faceId2,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await response.json();
    return data.isIdentical === true && data.confidence > 0.6;
  } catch (error) {
    console.error('Face verification error:', error);
    return false;
  }
};

// تحويل Base64 إلى Blob
const convertBase64ToBlob = (base64: string): Blob => {
  const base64Data = base64.split(',')[1];
  const byteCharacters = atob(base64Data);
  const byteArrays = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  return new Blob([byteArrays], { type: 'application/octet-stream' });
};