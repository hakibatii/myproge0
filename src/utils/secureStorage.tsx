import * as SecureStore from 'expo-secure-store';

// حفظ بيانات آمنة
export const saveSecureData = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(خطأ أثناء حفظ ${key}:, error);
  }
};

// استرجاع بيانات آمنة
export const getSecureData = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(خطأ أثناء استرجاع ${key}:, error);
    return null;
  }
};

// حذف بيانات آمنة
export const deleteSecureData = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(خطأ أثناء حذف ${key}:, error);
  }
};