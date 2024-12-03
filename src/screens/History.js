import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const History = ({ navigation }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Riwayat');
  const [loading, setLoading] = useState(true);

  const updateOrderStatus = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId)
        .select();

      if (error) throw error;
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data);

      data.forEach(order => {
        if (order.status === 'pending') {
          setTimeout(() => {
            updateOrderStatus(order.id);
          }, 15000);
        }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const subscription = supabase
      .channel('order_updates')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        }, 
        payload => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filterOrdersByStatus = () => {
    switch (activeTab) {
      case 'Riwayat':
        return orders.filter(order => order.status === 'completed');
      case 'Diproses':
        return orders.filter(order => order.status === 'pending');
      case 'Cancel':
        return orders.filter(order => order.status === 'cancelled');
      default:
        return orders;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#34D399';
      case 'pending':
        return '#FBBF24';
      default:
        return '#EF4444';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity History</Text>
        <View style={styles.tabContainer}>
          {['Riwayat', 'Diproses', 'Cancel'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView 
        style={styles.orderList}
        showsVerticalScrollIndicator={false}
      >
        {filterOrdersByStatus().map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('HistoryDetail', { order })}
          >
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/carhistory.png')}
                style={styles.orderImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>{order.service_type}</Text>
              <View style={styles.userInfo}>
                <Ionicons name="person-circle-outline" size={20} color="#6366F1" />
                <Text style={styles.userName}>{order.customer_name}</Text>
              </View>
              <Text style={styles.orderDate}>
                {formatDate(order.appointment_date)}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(order.status) }
                ]}
              >
                <Text style={styles.statusText}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {filterOrdersByStatus().length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={80} color="#E5E7EB" />
            <Text style={styles.emptyStateText}>No orders found</Text>
            <Text style={styles.emptyStateSubtext}>
              Your orders will appear here once you make a booking
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#3D50DF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#6366F1',
  },
  orderList: {
    padding: 16,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
    height: 140, // Tetapkan tinggi yang fixed
  },
  imageContainer: {
    width: 140, // Sedikit lebih lebar dari sebelumnya
    overflow: 'hidden',
  },
  orderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  orderInfo: {
    flex: 1,
    padding: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userName: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 6,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    marginTop: 24,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
  },
  emptyStateSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default History;