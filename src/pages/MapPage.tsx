import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPage = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 31.7917,    // مركز الخريطة: المغرب
          longitude: -7.0926,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
        showsUserLocation={true}        // عرض موقع المستخدم
        showsMyLocationButton={true}    // زر الانتقال لموقع المستخدم
        zoomEnabled={true}              // تفعيل الزوم
        zoomControlEnabled={true}       // تفعيل زر الزوم
      >
        {/* علامة لموقع مراكش */}
        <Marker
          coordinate={{ latitude: 31.63, longitude: -8.0089 }}
          title="مراكش"
          description="رحلة منظمة إلى مراكش"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapPage;