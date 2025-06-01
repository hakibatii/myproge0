
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { Filter, Search, ArrowDownUp } from '@expo/vector-icons/Feather';
import { useLanguage } from '@/contexts/LanguageContext';

interface SortOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SearchBarProps {
  placeholder: string;
  style?: object;
  showFilter?: boolean;
  sortOptions?: SortOption[];
  onSortChange?: (sortId: string) => void;
  currentSort?: string | null;
}

const SearchBar = ({ 
  placeholder, 
  style = {}, 
  showFilter = true, 
  sortOptions = [], 
  onSortChange,
  currentSort 
}: SearchBarProps) => {
  const { t, language } = useLanguage();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  
  const filters = [
    { id: "trips", label: "رحلات" },
    { id: "guides", label: "مرشدين" },
    { id: "cities", label: "مدن" },
    { id: "hotels", label: "فنادق" },
  ];
  
  const toggleFilter = (filterId: string) => {
    setSelectedFilters(current => 
      current.includes(filterId)
        ? current.filter(id => id !== filterId)
        : [...current, filterId]
    );
  };

  const isRTL = language === 'ar';

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        {showFilter && (
          <TouchableOpacity 
            style={[styles.filterButton, isRTL ? styles.filterButtonRTL : styles.filterButtonLTR]}
            onPress={() => setFilterModalVisible(true)}
          >
            <Filter size={16} color="#6B7280" />
            <Text style={styles.filterText}>{t("filter")}</Text>
          </TouchableOpacity>
        )}

        <TextInput
          style={[styles.input, isRTL ? styles.inputRTL : styles.inputLTR]}
          placeholder={placeholder}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>اختر الفلاتر</Text>
            
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={styles.filterItem}
                onPress={() => toggleFilter(filter.id)}
              >
                <Text style={styles.filterItemText}>{filter.label}</Text>
                {selectedFilters.includes(filter.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            {sortOptions.length > 0 && (
              <>
                <View style={styles.separator} />
                <Text style={styles.modalTitle}>{t("sort")}</Text>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.sortItem}
                    onPress={() => {
                      onSortChange?.(option.id);
                      setFilterModalVisible(false);
                    }}
                  >
                    {option.icon}
                    <Text style={styles.sortItemText}>{option.label}</Text>
                    {currentSort === option.id && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t("close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    height: 42,
    paddingHorizontal: 12
  },
  filterButtonRTL: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB'
  },
  filterButtonLTR: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB'
  },
  filterText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    color: '#1F2937'
  },
  inputRTL: {
    textAlign: 'right',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  inputLTR: {
    textAlign: 'left',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937'
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  filterItemText: {
    fontSize: 14,
    color: '#1F2937'
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  sortItemText: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8
  },
  checkmark: {
    color: '#2563EB'
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12
  },
  closeButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default SearchBar;
