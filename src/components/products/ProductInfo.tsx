// ProductInfo.tsx
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Product from '@/src/types/Product'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const imageUrl = Array.isArray(product.images)
        ? product.images[0]
        : product.images
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginVertical: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    image: { width: 200, height: 200, marginBottom: 0 },
})

export default ProductInfo
