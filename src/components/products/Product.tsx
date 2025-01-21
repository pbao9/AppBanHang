import Feather from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Product = ({
    id,
    title,
    rating,
    price,
    thumbnail,
}: {
    id: number
    title: string
    rating: number
    price: number
    thumbnail: any
}) => {
    return (
        <View style={styles.productCard}>
            <Link href={`/Products/ProductDetail?id=${id}`}>
                <Image
                    source={{ uri: thumbnail }}
                    style={styles.productImage}
                />
                <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{title}</Text>
                    <View style={styles.productRating}>
                        <Text>{rating}/5</Text>
                        <Feather
                            name="star"
                            color="orange"
                            size={14}
                            style={{ marginLeft: 4 }}
                        />
                    </View>
                    <View style={styles.productFooter}>
                        <Text style={styles.productPrice}>${price}</Text>
                        <TouchableOpacity style={styles.infoButton}>
                            <Feather name="info" size={14} color="#007BFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
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
        width: '48%',
    },
    productImage: {
        width: '100%',
        height: 220,
        backgroundColor: '#4A90E2',
        resizeMode: 'contain',
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
        width: '100%',
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

export default Product
