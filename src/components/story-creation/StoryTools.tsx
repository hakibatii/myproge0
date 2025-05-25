
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, FlatList } from 'react-native';
import { Edit, Crop, RotateCw, Music, Type, PanelRight } from '@expo/vector-icons/Feather';
import { useToast } from '@/hooks/use-toast';

interface StoryToolsProps {
  onAddText?: (text: string, color: string, size: number) => void;
  onAddMusic?: (musicUrl: string) => void;
}

const StoryTools = ({ onAddText, onAddMusic }: StoryToolsProps = {}) => {
  const { toast } = useToast();
  const [textInput, setTextInput] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textSize, setTextSize] = useState(24);
  const [musicSearch, setMusicSearch] = useState("");
  const [activeModal, setActiveModal] = useState<'edit' | 'text' | 'music' | null>(null);
  
  const demoMusicTracks = [
    { id: "1", title: "أغنية حماسية", artist: "فنان عربي", duration: "3:45", url: "https://example.com/song1.mp3" },
    { id: "2", title: "نغمة هادئة", artist: "فنان عربي", duration: "4:20", url: "https://example.com/song2.mp3" },
    { id: "3", title: "موسيقى كلاسيكية", artist: "فنان عالمي", duration: "2:55", url: "https://example.com/song3.mp3" },
  ];

  const handleAddTextPress = () => {
    if (!textInput.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال نص",
        variant: "destructive",
      });
      return;
    }
    
    if (onAddText) {
      onAddText(textInput, textColor, textSize);
      setActiveModal(null);
      toast({
        title: "تم",
        description: "تمت إضافة النص بنجاح",
      });
    }
  };

  const renderEditModal = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>تعديل القصة</Text>
      <View style={styles.toolsGrid}>
        <TouchableOpacity style={styles.toolButton}>
          <Crop size={20} color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton}>
          <RotateCw size={20} color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton}>
          <PanelRight size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity 
          style={styles.toolbarButton}
          onPress={() => setActiveModal('edit')}
        >
          <Edit size={24} color="#1F2937" />
          <Text style={styles.toolbarButtonText}>تعديل</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toolbarButton}
          onPress={() => setActiveModal('text')}
        >
          <Type size={24} color="#1F2937" />
          <Text style={styles.toolbarButtonText}>نص</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toolbarButton}
          onPress={() => setActiveModal('music')}
        >
          <Music size={24} color="#1F2937" />
          <Text style={styles.toolbarButtonText}>موسيقى</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={activeModal !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalContainer}>
          {activeModal === 'edit' && renderEditModal()}
          {activeModal === 'text' && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>إضافة نص</Text>
              <TextInput
                style={styles.textInput}
                value={textInput}
                onChangeText={setTextInput}
                placeholder="اكتب نصًا..."
                placeholderTextColor="#9CA3AF"
                multiline
              />
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddTextPress}
              >
                <Text style={styles.addButtonText}>إضافة</Text>
              </TouchableOpacity>
            </View>
          )}
          {activeModal === 'music' && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>إضافة موسيقى</Text>
              <TextInput
                style={styles.searchInput}
                value={musicSearch}
                onChangeText={setMusicSearch}
                placeholder="ابحث عن موسيقى..."
                placeholderTextColor="#9CA3AF"
              />
              <FlatList
                data={demoMusicTracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.trackItem}
                    onPress={() => {
                      if (onAddMusic) {
                        onAddMusic(item.url);
                        setActiveModal(null);
                      }
                    }}
                  >
                    <View>
                      <Text style={styles.trackTitle}>{item.title}</Text>
                      <Text style={styles.trackArtist}>{item.artist}</Text>
                    </View>
                    <Text style={styles.trackDuration}>{item.duration}</Text>
                  </TouchableOpacity>
                )}
                style={styles.trackList}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  toolbarButton: {
    alignItems: 'center'
  },
  toolbarButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: '#1F2937'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16
  },
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  toolButton: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlign: 'right'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlign: 'right'
  },
  addButton: {
    backgroundColor: '#00A4A6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500'
  },
  trackList: {
    maxHeight: 300
  },
  trackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937'
  },
  trackArtist: {
    fontSize: 12,
    color: '#6B7280'
  },
  trackDuration: {
    fontSize: 12,
    color: '#6B7280'
  }
});

export default StoryTools;
