import RecipesList from '@/src/components/recipes/RecipesList'
import { Text, View } from 'react-native'

export default function Page() {
    return (
        <View className="flex justify-center items-center min-h-screen">
            <Text className="text-red-700 text-2xl font-bold">
                <RecipesList />
            </Text>
        </View>
    )
}
