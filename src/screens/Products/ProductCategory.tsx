import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useSearchParams } from 'expo-router/build/hooks'
import Product from '@/src/types/Product'
import { fetchProductsByCategory } from '@/src/services/Product/ProductService'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from 'expo-router'
import Products from '@/src/components/products/Product'

export default function ProductCategory() {
    const params = useSearchParams()
    const slug = params.get('slug')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigation = useNavigation()

    useEffect(() => {
        if (slug) {
            const fetchProducts = async () => {
                try {
                    const data = await fetchProductsByCategory(slug)
                    setProducts(data)
                } catch (err) {
                    setError('Failed to fetch products')
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            }

            fetchProducts()
        }
    }, [slug])

    if (loading) {
        return (
            <SafeAreaView>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                </View>
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView>
                <Text>{error}</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.conner}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>DANH MỤC : {slug}</Text>
                <View style={styles.conner}>
                    <Feather
                        name="alert-octagon"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                </View>
            </View>
            <View style={styles.section}>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Products
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            thumbnail={item.thumbnail}
                            key={item.id}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 150,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    headerContainer: {
        zIndex: 999,
        height: 'auto',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    conner: {
        backgroundColor: 'rgba(238, 255, 238, 0.30)',
        padding: 5,
        borderRadius: 10,
    },
    icon: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 8,
        shadowColor: '#efefef',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        opacity: 1,
    },
})
