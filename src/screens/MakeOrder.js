import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const services = [
  {
    id: 1,
    name: 'Exterior Cleaning',
    price: 200000,
    icon: 'car-outline',
    description: 'Complete exterior car wash and wax',
  },
  {
    id: 2,
    name: 'Interior Cleaning',
    price: 250000,
    icon: 'color-wand-outline',
    description: 'Deep cleaning of car interior and vacuum',
  },
  {
    id: 3,
    name: 'AC Cleaning',
    price: 150000,
    icon: 'snow-outline',
    description: 'AC system cleaning and sanitization',
  },
  {
    id: 4,
    name: 'Wheel Trim',
    price: 100000,
    icon: 'disc-outline',
    description: 'Wheel cleaning and tire dressing',
  },
  {
    id: 5,
    name: 'Full Cleaning',
    price: 500000,
    icon: 'sparkles-outline',
    description: 'Complete interior and exterior detailing',
  },
];

const MakeOrder = ({ navigation }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    carType: '',
    policeNumber: '',
    location: '',
    date: new Date(),
    selectedService: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        selectedDate = currentDate;
      }
      
      const newDate = new Date(selectedDate);
      const hours = tempDate.getHours();
      const minutes = tempDate.getMinutes();
      
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      
      setTempDate(newDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const newDate = new Date(tempDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setTempDate(newDate);
    }
  };

  const handleConfirmDateTime = () => {
    setFormData(prevState => ({
      ...prevState,
      date: tempDate
    }));
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const selectService = (service) => {
    setFormData({ ...formData, selectedService: service });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!formData.carType.trim()) {
      Alert.alert('Error', 'Please enter car type');
      return;
    }

    if (!formData.policeNumber.trim()) {
      Alert.alert('Error', 'Please enter police number');
      return;
    }

    if (!formData.location.trim()) {
      Alert.alert('Error', 'Please enter your location');
      return;
    }

    if (!formData.selectedService) {
      Alert.alert('Error', 'Please select a service');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            customer_name: formData.name.trim(),
            car_type: formData.carType.trim(),
            police_number: formData.policeNumber.trim(),
            location: formData.location.trim(),
            appointment_date: formData.date.toISOString(),
            service_type: formData.selectedService.name,
            status: 'pending',
          },
        ])
        .select();

      if (error) throw error;

      Alert.alert('Success', 'Your order has been placed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('MainTabs', { screen: 'Notifikasi' });
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Make Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesScroll}
          >
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  formData.selectedService?.id === service.id && styles.selectedCard,
                ]}
                onPress={() => selectService(service)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    formData.selectedService?.id === service.id &&
                      styles.selectedIconContainer,
                  ]}
                >
                  <Ionicons
                    name={service.icon}
                    size={28}
                    color={
                      formData.selectedService?.id === service.id ? '#FFFFFF' : '#1A1A1A'
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.serviceName,
                    formData.selectedService?.id === service.id &&
                      styles.selectedText,
                  ]}
                >
                  {service.name}
                </Text>
                <Text
                  style={[
                    styles.servicePrice,
                    formData.selectedService?.id === service.id &&
                      styles.selectedText,
                  ]}
                >
                  Rp{service.price.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.serviceDescription,
                    formData.selectedService?.id === service.id &&
                      styles.selectedText,
                  ]}
                >
                  {service.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Car Type</Text>
              <TextInput
                style={styles.input}
                value={formData.carType}
                onChangeText={(text) => setFormData({ ...formData, carType: text })}
                placeholder="Enter car type"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Police Number</Text>
              <TextInput
                style={styles.input}
                value={formData.policeNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, policeNumber: text })
                }
                placeholder="Enter police number"
                placeholderTextColor="#999"
                editable={!loading}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Your Location</Text>
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder="Enter your location"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date and Time</Text>
              <View style={styles.dateTimeContainer}>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(true)}
                  disabled={loading}
                >
                  <Text style={styles.dateTimeText}>
                    {formatDate(formData.date)}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#1A1A1A" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowTimePicker(true)}
                  disabled={loading}
                >
                  <Text style={styles.dateTimeText}>
                    {formatTime(formData.date)}
                  </Text>
                  <Ionicons name="time-outline" size={20} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {Platform.OS === 'ios' ? (
        <Modal
          transparent={true}
          visible={showDatePicker || showTimePicker}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate}
                mode={showDatePicker ? 'date' : 'time'}
                display="spinner"
                onChange={showDatePicker ? onDateChange : onTimeChange}
                minimumDate={new Date()}
                textColor="black"
                themeVariant="dark" 
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleConfirmDateTime}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <>
          {showDatePicker && (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={tempDate}
              mode="time"
              display="default"
              onChange={onTimeChange}
              is24Hour={true}
            />
          )}
        </>
      )}

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Processing...' : 'Make Order'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F8F9FD',
 },
 header: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   backgroundColor: '#3D50DF',
   paddingHorizontal: 20,
   paddingTop: Platform.OS === 'ios' ? 60 : 20,
   paddingBottom: 20,
   borderBottomLeftRadius: 30,
   borderBottomRightRadius: 30,
 },
 backButton: {
   width: 40,
   height: 40,
   borderRadius: 20,
   backgroundColor: 'rgba(255, 255, 255, 0.2)',
   justifyContent: 'center',
   alignItems: 'center',
 },
 headerTitle: {
   fontSize: 24,
   fontWeight: '700',
   color: '#FFFFFF',
 },
 content: {
   flex: 1,
 },
 servicesContainer: {
   padding: 20,
 },
 servicesScroll: {
   paddingRight: 20,
 },
 sectionTitle: {
   fontSize: 20,
   fontWeight: '700',
   color: '#1A2151',
   marginBottom: 16,
 },
 serviceCard: {
   width: width * 0.7,
   padding: 20,
   marginRight: 16,
   borderRadius: 20,
   backgroundColor: '#FFFFFF',
   shadowColor: '#6366F1',
   shadowOffset: {
     width: 0,
     height: 4,
   },
   shadowOpacity: 0.1,
   shadowRadius: 12,
   elevation: 5,
 },
 selectedCard: {
   backgroundColor: '#3D50DF',
 },
 iconContainer: {
   width: 56,
   height: 56,
   borderRadius: 28,
   backgroundColor: '#F0F3FF',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 16,
 },
 selectedIconContainer: {
   backgroundColor: 'rgba(255, 255, 255, 0.2)',
 },
 serviceName: {
   fontSize: 18,
   fontWeight: '700',
   color: '#1A2151',
   marginBottom: 8,
 },
 servicePrice: {
   fontSize: 16,
   fontWeight: '600',
   color: '#3D50DF',
   marginBottom: 12,
 },
 serviceDescription: {
   fontSize: 14,
   color: '#6B7280',
   lineHeight: 20,
 },
 selectedText: {
   color: '#FFFFFF',
 },
 formSection: {
   padding: 20,
   backgroundColor: '#FFFFFF',
   borderTopLeftRadius: 30,
   borderTopRightRadius: 30,
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: -4,
   },
   shadowOpacity: 0.05,
   shadowRadius: 8,
   elevation: 5,
   flex: 1,
 },
 form: {
   gap: 20,
 },
 inputContainer: {
   gap: 8,
 },
 label: {
   fontSize: 16,
   fontWeight: '600',
   color: '#1A2151',
 },
 input: {
  height: 56,
  backgroundColor: '#F8F9FD',
  borderRadius: 16,
  paddingHorizontal: 20,
  fontSize: 16,
  color: '#1A2151',
},
dateTimeContainer: {
  flexDirection: 'row',
  gap: 12,
},
dateInput: {
  flex: 1,
  height: 56,
  backgroundColor: '#F8F9FD',
  borderRadius: 16,
  paddingHorizontal: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
dateTimeText: {
  fontSize: 16,
  color: '#1A2151',
},
modalContainer: {
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
  backgroundColor: 'white',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
},
modalButtons: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 15,
},
modalButton: {
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
  backgroundColor: '#3D50DF',
},
modalButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
},
submitButton: {
  margin: 20,
  height: 56,
  backgroundColor: '#3D50DF',
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#3D50DF',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},
submitButtonText: {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: '600',
},
disabledButton: {
  opacity: 0.6,
},
});

export default MakeOrder;