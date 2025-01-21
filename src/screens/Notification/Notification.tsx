import Topbar from '@/src/components/partials/Topbar'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Notification = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Topbar title={'Thông báo'} bgColor="#4A90E2" />
            <View style={styles.container}>
                <Text>Chào mừng đến App Bán hàng</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        width: '100%',
    },
})

export default Notification
