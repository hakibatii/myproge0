import React, { useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AZURE_FACE_ENDPOINT = "https://tripmarocgroup.cognitiveservices.azure.com/face/v1.0";
const AZURE_FACE_KEY = "GHqN11H0wJc8HRY0XGLrUbNMwNrOhFqkbpJKdeavrLS9xDQ34WO1JQQJ99BEACYeBjFXJ3w3AAAKACOGewcL";

export default function FaceVerification() {
  const [idPhotoUri, setIdPhotoUri] = useState<string | null>(null);
  const [facePhotoUri, setFacePhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // اختيار صورة البطاقة من المعرض
  const pickIdPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("صلاحيات مرفوضة", "يرجى السماح بالوصول إلى المعرض.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setIdPhotoUri(result.assets[0].uri);
      setResult(null); // إعادة تعيين النتيجة بعد اختيار صورة جديدة
    }
  };

  // التقاط صورة الوجه بالكاميرا
  const captureFacePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("صلاحيات مرفوضة", "يرجى السماح بالوصول إلى الكاميرا.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setFacePhotoUri(result.assets[0].uri);
      setResult(null); // إعادة تعيين النتيجة بعد التقاط صورة جديدة
    }
  };

  // دالة تساعد على جلب الصورة كـ blob لإرسالها لAPI
  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  // استدعاء API الكشف عن الوجه والحصول على faceId
  const detectFace = async (imageUri: string): Promise<string | null> => {
    try {
      const blob = await uriToBlob(imageUri);
      const response = await fetch(${AZURE_FACE_ENDPOINT}/detect?returnFaceId=true, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": AZURE_FACE_KEY,
        },
        body: blob,
      });
      const data = await response.json();
      if (data.length > 0 && data[0].faceId) {
        return data[0].faceId;
      } else {
        Alert.alert("لم يتم اكتشاف وجه", "يرجى المحاولة بصورة أوضح.");
        return null;
      }
    } catch (error) {
      Alert.alert("خطأ", "فشل في اكتشاف الوجه. حاول مرة أخرى.");
      return null;
    }
  };

  // التحقق من تطابق الوجهين
  const verifyFaces = async () => {
    if (!idPhotoUri || !facePhotoUri) {
      Alert.alert("الصور ناقصة", "يرجى اختيار صورة البطاقة والتقاط صورة الوجه.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const idFaceId = await detectFace(idPhotoUri);
      if (!idFaceId) {
        setLoading(false);
        return;
      }
      const faceFaceId = await detectFace(facePhotoUri);
      if (!faceFaceId) {
        setLoading(false);
        return;
      }

      const response = await fetch(${AZURE_FACE_ENDPOINT}/verify, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": AZURE_FACE_KEY,
        },
        body: JSON.stringify({
          faceId1: idFaceId,
          faceId2: faceFaceId,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.isIdentical) {
        setResult(الوجه مطابق بثقة ${ (data.confidence * 100).toFixed(2) }%);
      } else {
        setResult("الوجه غير مطابق.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("خطأ", "فشل التحقق من الوجه.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>التحقق من الوجه (المرحلة 3)</Text>

      <Button title="اختر صورة البطاقة" onPress={pickIdPhoto} />
      {idPhotoUri && <Image source={{ uri: idPhotoUri }} style={styles.imagePreview} />}

      <Button title="التقط صورة الوجه" onPress={captureFacePhoto} />
      {facePhotoUri && <Image source={{ uri: facePhotoUri }} style={styles.imagePreview} />}

      <Button title="تحقق من التطابق" onPress={verifyFaces} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 15 }} />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  imagePreview: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
    alignSelf: "center",
  },
  result: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});