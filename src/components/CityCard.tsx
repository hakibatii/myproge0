
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, Star } from '@expo/vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useLanguage } from '@/contexts/LanguageContext';

interface CityCardProps {
  id: string;
  image: string;
  name: string;
  rating: number;
  reviewCount: number;
  description: string;
  onPress?: () => void;
}

const CityCard = ({
  image,
  name,
  rating,
  reviewCount,
  description,
  onPress,
}: CityCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useLanguage();
  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity
      style={[styles.container, { width: width - 32 }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Heart
            size={18}
            color={isFavorite ? '#E53E3E' : '#4A5568'}
            fill={isFavorite ? '#E53E3E' : 'none'}
          />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  color={i < Math.floor(rating) ? '#F6AD55' : '#A0AEC0'}
                  fill={i < Math.floor(rating) ? '#F6AD55' : 'none'}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              ({reviewCount}) {rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={onPress}
          >
            <Text style={styles.detailsButtonText}>
              {t('view_details') || "عرض التفاصيل"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.shareButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Star size={20} color="#0D9488" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsButton: {
    backgroundColor: '#0D9488',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
});

export default CityCard;
