import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { fetchRecipes } from '@/src/services/Recipes/RecipesService'
import { Recipes, RecipesResponse } from '@/src/types/Recipes'

const RecipesList = () => {
    const [recipes, setRecipes] = useState<Recipes[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)
    const limit = 12

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data: RecipesResponse = await fetchRecipes(page, limit)
                // Gán recipes từ data về (RecipesResponse)
                setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes])
            } catch (err) {
                setError('Failed to fetch recipes')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        getRecipes()
    }, [page])

    if (loading && page === 1) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Công thức nấu ăn</Text>
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.recipeImage}
                        />
                        <Text style={styles.recipeTitle}>{item.name}</Text>
                        <Text style={styles.recipeCuisine}>{item.cuisine}</Text>
                        <Text style={styles.recipeRating}>
                            Rating: {item.rating}
                        </Text>
                    </View>
                )}
                numColumns={2} // Chia thành 2 cột
                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.5}
            />
            {loading && page > 1 && (
                <ActivityIndicator
                    size="large"
                    color="#4A90E2"
                    style={styles.loadingMore}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        padding: 15,
        marginBottom: 170,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recipeCard: {
        backgroundColor: '#efefef',
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '48%',
        margin: '1%',
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeCuisine: {
        fontSize: 14,
        color: 'gray',
    },
    recipeRating: {
        fontSize: 14,
        color: 'green',
    },
    recipeImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    loadingMore: {
        marginTop: 20,
    },
})

export default RecipesList
