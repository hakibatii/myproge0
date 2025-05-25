
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface StoryDiscardDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

const StoryDiscardDialog = ({ open, setOpen, onConfirm }: StoryDiscardDialogProps) => {
  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>تجاهل القصة؟</Text>
            <Text style={styles.description}>
              هل أنت متأكد أنك تريد تجاهل هذه القصة؟ سيتم فقد جميع التغييرات.
            </Text>
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.cancelButtonText}>إلغاء</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.discardButton}
              onPress={() => {
                onConfirm();
                setOpen(false);
              }}
            >
              <Text style={styles.discardButtonText}>تجاهل</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    padding: 24
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'right',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6'
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500'
  },
  discardButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444'
  },
  discardButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500'
  }
});

export default StoryDiscardDialog;
