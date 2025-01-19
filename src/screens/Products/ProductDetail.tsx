// ProductDetail.tsx
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'expo-router/build/hooks'
import Product from '@/src/types/Product'
import { fetchProductById } from '@/src/services/Product/ProductService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProductInfo from '@/src/components/products/ProductInfo'

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
            <View className="flex justify-center items-center p-16">
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        )
    }

    return (
        <View className="w-full min-h-screen" style={styles.container}>
            <ProductInfo product={product} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
})
export default ProductDetail
