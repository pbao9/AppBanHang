import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { fetchProductsByCategory } from '../../../services/Product/ProductService'
import { Link } from 'expo-router'

interface Product {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
}

const ProductCategory = ({ category }: { category: string }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const data = await fetchProductsByCategory(category)
                setProducts(data.slice(0, 8))
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [category])

    const windowWidth = Dimensions.get('window').width

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        )
    }

    return (
        <ScrollView
            style={{ flex: 1, maxHeight: 300 }}
            contentContainerStyle={{ paddingVertical: 20 }}
            showsHorizontalScrollIndicator={false}
        >
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pb-4"
            >
                {products.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            width: windowWidth * 0.45,
                            marginHorizontal: 10,
                            backgroundColor: '#efefef',
                            borderRadius: 10,
                            overflow: 'hidden',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                        }}
                    >
                        <Link href={`/Products/ProductDetail?id=${item.id}`}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={{
                                    width: '100%',
                                    height: 150,
                                    resizeMode: 'cover',
                                }}
                            />
                            <View
                                style={{ padding: 10 }}
                                className="flex flex-col justify-between items-start"
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#333',
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text>{item.rating}/5</Text>
                                    <Feather
                                        name="star"
                                        color={'orange'}
                                        size={14}
                                        style={{ marginLeft: 4 }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: '#333',
                                        }}
                                    >
                                        ${item.price}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Feather
                                            name="info"
                                            size={14}
                                            color="#007BFF"
                                            style={{ marginLeft: 4 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Link>
                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    )
}

export default ProductCategory
