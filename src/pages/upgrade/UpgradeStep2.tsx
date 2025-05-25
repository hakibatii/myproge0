import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import CaptureIDPhoto from './captureIDPhoto';

const UpgradeStep2 = () => {
  const [idPhotoUri, setIdPhotoUri] = useState<string | null>(null);

  // حفظ الصورة بعد الالتقاط
  const handleSavePhoto = (uri: string) => {
    setIdPhotoUri(uri);
    Alert.alert('تم التقاط الصورة', 'تم حفظ صورة البطاقة الوطنية.');
  };

  // التحقق قبل الانتقال للمرحلة التالية
  const handleNextStep = () => {
    if (!idPhotoUri) {
      Alert.alert('خطأ', 'يرجى التقاط صورة البطاقة أولاً.');
      return;
    }

    // هنا يمكنك حفظ الصورة مثلاً في التخزين المحلي أو إرسالها للسيرفر
    Alert.alert('تم', 'يمكنك الآن متابعة التحقق من الوجه.');
  };

  return (
    <View style={styles.container}>
      <CaptureIDPhoto onSave={handleSavePhoto} />
      <Button title="التالي" onPress={handleNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default UpgradeStep2;