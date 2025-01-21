import { Stack } from 'expo-router'
import '../global.css'
import { Text, View } from 'react-native'
import Topbar from '@/src/components/partials/Topbar'
import Feather from '@expo/vector-icons/Feather'
export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                    headerTitle: '',
                }}
            ></Stack.Screen>
            <Stack.Screen
                name="Products/ProductDetail"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Products/ProductCategory"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}
