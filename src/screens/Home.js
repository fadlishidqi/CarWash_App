// src/screens/Home.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const services = [
    {
      id: 1,
      name: 'Exterior\nCleaning',
      icon: 'car-outline',
    },
    {
      id: 2,
      name: 'Interior\nCleaning',
      icon: 'car-sport-outline',
    },
    {
      id: 3,
      name: 'Wheel\nTrim',
      icon: 'disc-outline',
    },
    {
      id: 4,
      name: 'AC\nCleaning',
      icon: 'snow-outline',
    },
    {
      id: 5,
      name: 'Full\nCleaning',
      icon: 'sparkles-outline',
    },
  ];

  const promotions = [
    {
      id: 1,
      title: 'Diskon Hingga 40%',
      subtitle: 'Untuk Cuci Eksterior',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
    },
    {
      id: 2,
      title: 'Hemat 25%',
      subtitle: 'Paket Interior Premium',
      image: 'https://images.unsplash.com/photo-1645966923376-33eaf7007665?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Promo Spesial',
      subtitle: 'Full Cleaning Service',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9',
    },
  ];

  const bookings = [
    {
      id: 1,
      carModel: 'Toyota Avanza',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
      date: '05\nAGT',
    },
    {
      id: 2,
      carModel: 'Honda Jazz',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027',
      date: '06\nAGT',
    },
    {
      id: 3,
      carModel: 'Suzuki Ertiga',
      image: 'https://images.unsplash.com/photo-1594611342073-4bb7683c27ad',
      date: '07\nAGT',
    },
    {
      id: 4,
      carModel: 'Daihatsu Xenia',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
      date: '08\nAGT',
    },
  ];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Lokasi Saat Ini</Text>
          <View style={styles.locationWrapper}>
            <Ionicons name="location-outline" size={20} color="#4B7BE5" />
            <Text style={styles.locationText}>Jakarta, Indonesia</Text>
            <Ionicons name="chevron-down" size={20} color="#4B7BE5" />
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari layanan..."
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#FFF" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.promotionSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Penawaran Terbatas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {promotions.map((promo) => (
              <TouchableOpacity key={promo.id} style={styles.promotionCard}>
                <Image
                  source={{ uri: promo.image }}
                  style={styles.promotionImage}
                />
                <View style={styles.promotionContent}>
                  <Text style={styles.promotionTitle}>{promo.title}</Text>
                  <Text style={styles.promotionSubtitle}>{promo.subtitle}</Text>
                  <TouchableOpacity style={styles.claimButton}>
                    <Text style={styles.claimButtonText}>Klaim</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Layanan</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceItem}>
                <View style={styles.serviceIconContainer}>
                  <Ionicons name={service.icon} size={24} color="#4B7BE5" />
                </View>
                <Text style={styles.serviceText}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bookingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jadwal Booking</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bookings.map((booking) => (
              <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                <Image 
                  source={{ uri: booking.image }}
                  style={styles.bookingImage}
                  resizeMode="cover"
                />
                <View style={styles.bookingContent}>
                  <Text style={styles.bookingTitle}>{booking.carModel}</Text>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{booking.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
    marginTop: -20,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'ios' ? 60 : 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 1000,
  },
  scrollContent: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    marginBottom: 6,
    color: '#666',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B7BE5',
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 4,
  },
  filterText: {
    color: '#FFF',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    color: '#4B7BE5',
    fontWeight: '500',
  },
  promotionSection: {
    marginBottom: 24,
  },
  promotionCard: {
    width: width - 32,
    height: 160,
    marginLeft: 16,
    marginRight: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#4B7BE5',
  },
  promotionImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  promotionContent: {
    position: 'absolute',
    padding: 16,
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  promotionSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 16,
  },
  claimButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#4B7BE5',
    fontWeight: '600',
  },
  servicesSection: {
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  serviceItem: {
    width: '20%',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  bookingSection: {
    marginBottom: 24,
  },
  bookingCard: {
    width: width * 0.7,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginLeft: 16,
    marginRight: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F3F4F6',
  },
  bookingContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dateContainer: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 8,
  },
  dateText: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Home;