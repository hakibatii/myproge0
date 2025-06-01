import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';

const FeedbackScreen = () => {
  const [selectedType, setSelectedType] = useState('اقتراح فكرة جديدة');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    // هنا يمكنك إضافة كود إرسال الرسالة عبر البريد الإلكتروني أو API
    Alert.alert('تم الإرسال', نوع الرسالة: ${selectedType}\nالرسالة: ${message});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>شارك أفكارك معنا</Text>

      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="اقتراح فكرة جديدة" value="اقتراح فكرة جديدة" />
        <Picker.Item label="الإبلاغ عن مشكلة أو شكوى" value="الإبلاغ عن مشكلة أو شكوى" />
      </Picker>

      <TextInput
        style={styles.input}
        multiline
        placeholder="اكتب رسالتك هنا"
        value={message}
        onChangeText={setMessage}
      />

      <Button title="إرسال" onPress={sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 16, fontWeight: 'bold' },
  picker: { height: 50, marginBottom: 16 },
  input: { height: 100, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, padding: 8 },
});

export default FeedbackScreen;