import { Button, Text, View } from 'react-native'
import '../global.css'
import Header from '@/components/Header'

export default function HomeScreen() {
    return (
        <>
            <Header />
            <View className="flex justify-center items-center min-h-screen">
                <Text className="text-red-700 text-2xl font-bold">
                    Xin chào Võ Hoàng Bảo
                </Text>

                <Button title="Chi tiết" />
            </View>
        </>
    )
}
