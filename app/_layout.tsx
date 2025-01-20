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
                    // headerTitle: () => (
                    //     <View
                    //         style={{
                    //             flex: 1,
                    //             justifyContent: 'center',
                    //             alignItems: 'center',
                    //         }}
                    //     >
                    //         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    //             Chi tiết sản phẩm
                    //         </Text>
                    //     </View>
                    // ),
                    // headerRight: () => <Feather name="info" size={16} />,
                }}
            />
        </Stack>
    )
}
