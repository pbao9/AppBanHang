import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import Product from '@/src/types/Product'
import { fetchProductById } from '@/src/services/Product/ProductService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProductInfo from '@/src/components/products/ProductInfo'
import Topbar from '@/src/components/partials/Topbar'

const ProductDetail = () => {
    const params = useSearchParams()
    const id = params.get('id')
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        if (!id || product?.id === Number(id)) return

        const getProduct = async () => {
            try {
                const cachedProduct = await AsyncStorage.getItem(
                    `product_${id}`
                )
                if (cachedProduct) {
                    setProduct(JSON.parse(cachedProduct))
                    return
                }

                const fetchedProduct = await fetchProductById(Number(id))
                setProduct(fetchedProduct)
                await AsyncStorage.setItem(
                    `product_${id}`,
                    JSON.stringify(fetchedProduct)
                )
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }

        getProduct()
    }, [id])

    if (!product) {
        return (
            <View>
                <ActivityIndicator
                    size="large"
                    color=""
                    style={styles.center}
                />
            </View>
        )
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <View className="w-full min-h-screen" style={styles.container}>
                <View style={styles.productInfo}>
                    <ProductInfo product={product} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    center: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
    },
    productInfo: {
        height: '100%',
    },
})
export default ProductDetail
