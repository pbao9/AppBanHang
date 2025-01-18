import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import Feather from '@expo/vector-icons/Feather'

interface Product {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    rating: number
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false) // Trạng thái loading cho việc tải thêm sản phẩm
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchProducts = async (page: number) => {
        try {
            const response = await fetch(
                `https://dummyjson.com/products?limit=12&skip=${
                    (page - 1) * 12
                }`
            )
            const data = await response.json()
            if (data.products.length < 12) {
                setHasMore(false)
            }
            setProducts((prevProducts) => [...prevProducts, ...data.products])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setLoadingMore(false) // Đảm bảo rằng việc tải thêm kết thúc
        }
    }

    useEffect(() => {
        fetchProducts(page)
    }, [page])

    const loadMoreData = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true) // Đánh dấu là đang tải thêm
            setPage(page + 1)
        }
    }

    if (loading && page === 1) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        )
    }

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.productImage}
            />
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.productRating}>
                    <Text>{item.rating}/5</Text>
                    <Feather
                        name="star"
                        color={'orange'}
                        size={14}
                        style={{ marginLeft: 4 }}
                    />
                </View>
                <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>${item.price}</Text>
                    <TouchableOpacity style={styles.infoButton}>
                        <Feather name="info" size={14} color="#007BFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loadingMore ? (
                    <View style={styles.footerLoader}>
                        <ActivityIndicator size="large" color="#007BFF" />
                    </View>
                ) : null
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerLoader: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productCard: {
        flex: 1,
        margin: 10,
        backgroundColor: '#efefef',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    productDetails: {
        padding: 10,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    productRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default ProductList
