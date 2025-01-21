import RecipesList from '@/src/components/recipes/RecipesList'
import { SafeAreaView, Text, View } from 'react-native'

export default function Page() {
    return (
        <SafeAreaView>
            <View
                className="flex justify-center items-center min-h-screen"
                style={{
                    width: '100%',
                    padding: 15,
                }}
            >
                <RecipesList />
            </View>
        </SafeAreaView>
    )
}
