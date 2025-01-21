import React, { useEffect, useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { fetchProductCategoryList } from '@/src/services/Product/ProductService'
import Category from '@/src/types/Category'

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchProductCategoryList()
                setCategories(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item) => (
                    <TouchableOpacity
                        key={item.slug}
                        style={styles.categoryItem}
                    >
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    categoryItem: {
        padding: 10,
        marginRight: 16,
        backgroundColor: '#4A90E2',
        borderWidth: 1,
        borderColor: '#4A90E2',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: 18,
        color: '#efefef',
    },
})

export default CategoryList
