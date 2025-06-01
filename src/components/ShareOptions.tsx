import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet,
  Share,
  Linking
} from 'react-native';
import { 
  Facebook, 
  Instagram, 
  MessageSquareText, 
  Share2, 
  X 
} from 'lucide-react-native';
import { useToast } from '@/hooks/use-toast';

interface ShareOptionsProps {
  title: string;
  url?: string;
  onShare?: () => void;
}

const ShareOptions = ({ title, url = '', onShare }: ShareOptionsProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async (platform: string) => {
    try {
      switch (platform) {
        case 'facebook':
          await Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
          break;
        case 'instagram':
          toast({
            description: 'تم نسخ الرابط، يمكنك مشاركته على انستغرام',
          });
          // Clipboard functionality in React Native
          break;
        case 'whatsapp':
          await Linking.openURL(`whatsapp://send?text=${encodeURIComponent(title + ' ' + url)}`);
          break;
        default:
          await Share.share({
            title,
            message: url,
          });
      }

      if (onShare) {
        onShare();
      }
      
      setIsOpen(false);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    shareButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 8,
      marginBottom: 10,
    },
    shareGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    shareItem: {
      width: '48%',
      alignItems: 'center',
      marginBottom: 10,
    },
  });

  return (
    <>
      <TouchableOpacity 
        onPress={() => setIsOpen(true)}
        style={{flexDirection: 'row', alignItems: 'center'}}
      >
        <Share2 size={18} color="#6b7280" />
        <Text style={{marginLeft: 5}}>مشاركة</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center'}}>
              مشاركة المحتوى
            </Text>
            
            <View style={styles.shareGrid}>
              <TouchableOpacity 
                style={styles.shareItem}
                onPress={() => handleShare('facebook')}
              >
                <Facebook size={24} color="#3b5998" />
                <Text style={{marginTop: 5}}>فيسبوك</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareItem}
                onPress={() => handleShare('instagram')}
              >
                <Instagram size={24} color="#e1306c" />
                <Text style={{marginTop: 5}}>انستغرام</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareItem}
                onPress={() => handleShare('whatsapp')}
              >
                <MessageSquareText size={24} color="#25D366" />
                <Text style={{marginTop: 5}}>واتساب</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareItem}
                onPress={() => handleShare('copy')}
              >
                <Share2 size={24} color="#6b7280" />
                <Text style={{marginTop: 5}}>نسخ الرابط</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => setIsOpen(false)}
            >
              <Text>إلغاء</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ShareOptions;
