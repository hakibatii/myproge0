
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  onFilterChange: (id: string) => void;
}

const FilterTabs = ({ options, onFilterChange }: FilterTabsProps) => {
  const [activeFilter, setActiveFilter] = useState(options[0].id);
  const { language, t } = useLanguage();

  useEffect(() => {
    // لا نفعل شيئًا محددًا عند تغيير اللغة، لأن الترجمة ستتم تلقائيًا 
    // من خلال استخدام دالة `t` في كل مرة يتم فيها تقديم المكون
  }, [language]);

  const handleFilterChange = (id: string) => {
    setActiveFilter(id);
    onFilterChange(id);
  };

  const getTranslatedLabel = (label: string): string => {
    if (label.toLowerCase() === "الكل" || label.toLowerCase() === "all" || label.toLowerCase() === "tous") {
      return t("all") || label;
    }
    
    const translated = t(label.toLowerCase());
    return translated || label;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => handleFilterChange(option.id)}
          style={[
            styles.filterButton,
            activeFilter === option.id ? styles.activeButton : styles.inactiveButton
          ]}
        >
          <Text style={[
            styles.filterText,
            activeFilter === option.id ? styles.activeText : styles.inactiveText
          ]}>
            {getTranslatedLabel(option.label)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 8,
    flexDirection: 'row'
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4
  },
  activeButton: {
    backgroundColor: '#0D9488'
  },
  inactiveButton: {
    backgroundColor: '#F3F4F6'
  },
  filterText: {
    fontSize: 14,
    textAlign: 'right'
  },
  activeText: {
    color: '#FFFFFF'
  },
  inactiveText: {
    color: '#4B5563'
  }
});

export default FilterTabs;
