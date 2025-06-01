
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowDownUp, MapPin, Users, Clock, Calendar, ChevronDown } from '@expo/vector-icons/Feather';
import { useLanguage } from '@/contexts/LanguageContext';

// استيراد المكونات المحولة
import SearchBar from '@/components/SearchBar';
import CityCard from '@/components/CityCard';
import FilterTabs from '@/components/FilterTabs';
import FeaturedTrips from '@/components/home/FeaturedTrips';
import OrganizedTrips from '@/components/cities/OrganizedTrips';

const Cities = () => {
  const { t } = useLanguage();
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [activeClimate, setActiveClimate] = useState<string>("all");

  // خيارات المناخ
  const climateOptions = [
    { id: "all", label: "الكل" },
    { id: "culture", label: t("culture") },
    { id: "beach", label: t("beach") },
    { id: "mountain", label: t("mountain") },
    { id: "desert", label: t("desert") },
    { id: "forest", label: t("forest") },
    { id: "island", label: t("island") },
  ];

  const cities = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1539020140153-e8c237112187",
      name: "مراكش",
      rating: 4.8,
      reviewCount: 1245,
      description: "المدينة الحمراء الساحرة تشتهر بأسواقها التقليدية وقصر الباهية وحدائق ماجوريل الخلابة.",
      type: "culture",
      price: 500,
      distance: 150,
      groupSize: 10,
      availability: "now",
    },
    // ... باقي المدن
  ];

  const getSortedAndFilteredCities = () => {
    let result = cities;

    if (activeClimate !== 'all') {
      result = result.filter(city => city.type === activeClimate);
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.price - b.price;
          case 'distance':
            return a.distance - b.distance;
          case 'groupSize':
            return a.groupSize - b.groupSize;
          case 'availability':
            return a.availability === 'now' ? -1 : 1;
          default:
            return 0;
        }
      });
    }

    return result;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <SearchBar />
          
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => {
                // تنفيذ منطق الفرز
              }}
            >
              <ArrowDownUp size={20} color="#6B7280" />
              <Text style={styles.buttonText}>{t("sort")}</Text>
              <ChevronDown size={16} color="#6B7280" />
            </TouchableOpacity>

            <FilterTabs
              options={climateOptions}
              activeOption={activeClimate}
              onOptionChange={setActiveClimate}
            />
          </View>
        </View>

        <View style={styles.content}>
          {getSortedAndFilteredCities().map(city => (
            <CityCard
              key={city.id}
              city={city}
              onPress={() => navigation.navigate('CityDetails', { cityId: city.id })}
            />
          ))}
        </View>

        <View style={styles.section}>
          <FeaturedTrips />
        </View>

        <View style={styles.section}>
          <OrganizedTrips />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    padding: 16
  },
  filterContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
    gap: 4
  },
  buttonText: {
    fontSize: 14,
    color: '#6B7280',
    marginHorizontal: 4
  },
  content: {
    padding: 16,
    gap: 16
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16
  }
});

export default Cities;
