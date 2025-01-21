import React, { useState, useEffect, useCallback } from 'react'
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
import { fetchProducts } from '../../services/Product/ProductService'
import { Link } from 'expo-router'
import Product from '@/src/types/Product'

const ProductItem = React.memo(({ item }: { item: Product }) => (
    <View style={styles.productCard}>
        <Link href={`/Products/ProductDetail?id=${item.id}`}>
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
                        color="orange"
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
        </Link>
    </View>
))

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const loadProducts = useCallback(async () => {
        try {
            const data = await fetchProducts(page, 12)
            if (data.length < 12) {
                setHasMore(false)
            }
            setProducts((prevProducts) => [...prevProducts, ...data])
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }, [page])

    useEffect(() => {
        loadProducts()
    }, [page, loadProducts])

    const loadMoreData = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true)
            setPage((prevPage) => prevPage + 1)
        }
    }

    if (loading && page === 1) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        )
    }

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
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
