import React from 'react'
import { Tabs } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { TabBar } from '@/components/TabBar'
import SearchInput from '@/components/SearchInput'

export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: true,
                headerTitle: () => (
                    <View className="flex flex-row items-center">
                        <SearchInput />
                    </View>
                ),
            }}
        >
            <Tabs.Screen name="index" options={{ title: 'Trang chủ' }} />
            <Tabs.Screen name="explore" options={{ title: 'Khám phá' }} />
            <Tabs.Screen name="profile" options={{ title: 'Thông tin' }} />
        </Tabs>
    )
}
