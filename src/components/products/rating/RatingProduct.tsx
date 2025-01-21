import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Review } from '@/src/types/Product'

interface RatingProductProps {
    productId: number
    reviews: Review[]
}

const RatingProduct: React.FC<RatingProductProps> = ({
    productId,
    reviews,
}) => {
    if (!reviews || reviews.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text>Không có đánh giá nào cho sản phẩm này.</Text>
            </View>
        )
    }

    const displayedReviews = reviews.slice(0, 10)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đánh giá sản phẩm</Text>
            <ScrollView contentContainerStyle={styles.reviewsContainer}>
                {displayedReviews.map((item, index) => (
                    <View key={index} style={styles.reviewItem}>
                        <Text style={styles.reviewer}>
                            {item.reviewerName} ({item.rating}★)
                        </Text>
                        <Text style={styles.comment}>{item.comment}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewsContainer: {
        paddingBottom: 16,
    },
    reviewItem: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    reviewer: {
        fontWeight: 'bold',
    },
    comment: {
        marginTop: 5,
        fontSize: 14,
    },
    date: {
        marginTop: 5,
        fontSize: 12,
        color: '#888',
    },
    emptyContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default RatingProduct
