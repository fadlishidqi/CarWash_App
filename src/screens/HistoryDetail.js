import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const randomNames = [
  "Sarah Wilson",
  "James Chen",
  "Maria Garcia",
  "Alex Thompson",
  "Priya Patel",
  "David Kim",
  "Emma Roberts",
  "Michael Zhang",
  "Sofia Rodriguez",
  "John Smith"
];

const randomAvatars = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
  'https://randomuser.me/api/portraits/men/4.jpg',
  'https://randomuser.me/api/portraits/women/5.jpg',
  'https://randomuser.me/api/portraits/men/6.jpg',
  'https://randomuser.me/api/portraits/women/7.jpg',
  'https://randomuser.me/api/portraits/men/8.jpg',
  'https://randomuser.me/api/portraits/women/9.jpg',
  'https://randomuser.me/api/portraits/men/10.jpg'
];

const HistoryDetail = ({ navigation, route }) => {
  const { order } = route.params;
  
  // Generate random name and avatar when component mounts
  const randomName = React.useMemo(() => {
    return randomNames[Math.floor(Math.random() * randomNames.length)];
  }, []);

  const randomAvatar = React.useMemo(() => {
    return randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
  }, []);

  const getServicePrice = (serviceType) => {
    switch (serviceType) {
      case 'Exterior Cleaning':
        return 200000;
      case 'Interior Cleaning':
        return 250000;
      case 'AC Cleaning':
        return 150000;
      case 'Wheel Trim':
        return 100000;
      case 'Full Cleaning':
        return 500000;
      default:
        return 0;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const transportationFee = 20000;
  const tip = 50000;
  const discount = 70000;
  const totalPrice = getServicePrice(order.service_type) + transportationFee + tip - discount;

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: randomAvatar }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{randomName}</Text>
          <View style={styles.ratingBox}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons 
                key={star} 
                name="star" 
                size={16} 
                color="#FFD700" 
                style={styles.starIcon}
              />
            ))}
            <Text style={styles.ratingText}>5.0</Text>
          </View>
          <Text style={styles.dateText}>{formatDate(order.appointment_date)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentation</Text>
          <View style={styles.imageGrid}>
            <Image
              source={{ uri: 'https://marvel-b1-cdn.bc0a.com/f00000000270514/s25180.pcdn.co/wp-content/uploads/2018/06/DSC01703_crop.jpg' }}
              style={styles.documentImage}
            />
            <Image
              source={{ uri: 'https://www.slashgear.com/img/gallery/5-of-the-best-car-wash-soaps-for-your-vehicle/intro-1705512855.jpg' }}
              style={styles.documentImage}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Details</Text>
          <View style={styles.detailsCard}>
            {[
              { icon: 'car', text: order.car_type },
              { icon: 'card', text: order.police_number },
              { icon: 'brush', text: order.service_type }
            ].map((item, index) => (
              <View key={index} style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name={`${item.icon}-outline`} size={20} color="#4A90E2" />
                </View>
                <Text style={styles.detailText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Price</Text>
              <Text style={styles.paymentValue}>
                Rp{getServicePrice(order.service_type).toLocaleString()}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Transportation</Text>
              <Text style={styles.paymentValue}>
                Rp{transportationFee.toLocaleString()}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Tip</Text>
              <Text style={styles.paymentValue}>
                Rp{tip.toLocaleString()}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Discount</Text>
              <Text style={[styles.paymentValue, styles.discountText]}>
                -Rp{discount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.paymentRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                Rp{totalPrice.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3D50DF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  section: {
    padding: 20,
  },
  lastSection: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentImage: {
    width: (width - 50) / 2,
    height: 160,
    borderRadius: 15,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#1A1A1A',
    flex: 1,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#666',
  },
  paymentValue: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  discountText: {
    color: '#E53935',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A90E2',
  },
});

export default HistoryDetail;