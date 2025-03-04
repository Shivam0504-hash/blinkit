import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore'
import DeliveryHeader from '@components/delivery/DeliveryHeader'
import TabBar from '@components/delivery/TabBar'
import { fetchOrders } from '@service/orderService'
import CustomText from '@components/ui/CustomText'
import OrderItem from '@components/delivery/OrderItem'
import strings from '@utils/string'

const DeliveryDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const renderOrderItem = ({ item, index }: any) => {
    return (
      <OrderItem index={index} item={item} />
    )
  }

  const fetchData = async () => {
    setData([])
    setRefreshing(true)
    setLoading(true)
    const data = await fetchOrders(selectedTab, user?._id, user?.branch)
    setData(data);
    setRefreshing(false)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [selectedTab])

  const { user } = useAuthStore()
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await fetchData()}
            />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size='small' />
                </View>
              )
            }
            return (
              <View style={styles.center}>
                <CustomText>
                  {strings.noorder}
                </CustomText>
              </View>
            )
          }}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.orderId}
          contentContainerStyle={styles.flalisrContainer}

        />
      </View>
    </View>
  )
}

export default DeliveryDashboard

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer:
  {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flalisrContainer:
  {
    padding: 2,

  },
  center:
  {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
})