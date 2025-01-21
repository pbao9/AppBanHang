import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Linking,
} from 'react-native'
import Product from '@/src/types/Product'
import Topbar from '../partials/Topbar'
import { useNavigation } from 'expo-router'
import Badge from '../partials/Badge'
import ProductCategory from './ProductCategory'
import RatingProduct from './rating/RatingProduct'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const imageUrl = Array.isArray(product.images)
        ? product.images[0]
        : product.images
    const navigation = useNavigation()

    const handleContact = () => {
        const url = 'https://zalo.me/0837414353'
        Linking.openURL(url).catch((err) =>
            console.error('Failed to open URL:', err)
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Topbar title={product.title} />
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{product.title}</Text>
                    <View
                        style={{
                            paddingHorizontal: 10,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text>SKU: {product.sku}</Text>
                        <Text
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 10,
                            }}
                        >
                            <Text className="uppercase font-bold">
                                Danh mục: {product.category}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.tag}>
                        <Badge
                            title="Quánh giá"
                            icon="star"
                            data={product.rating}
                        />
                        <Badge
                            title="Giảm giá"
                            icon="percent"
                            data={product.discountPercentage}
                        />
                        <Badge
                            title="Đặt tối thiểu"
                            icon="box"
                            data={product.minimumOrderQuantity}
                        />
                    </View>
                    <Text style={styles.description}>
                        {product.description}
                    </Text>
                </View>
                <View style={styles.section}>
                    <RatingProduct
                        productId={product.id}
                        reviews={product.reviews}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Sản phẩm cùng danh mục</Text>
                    <ProductCategory category={product.category} />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleContact}>
                    <Text style={styles.buttonText}>LIÊN HỆ TƯ VẤN</Text>
                </TouchableOpacity>
                <Text style={styles.price}>${product.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    section: {
        padding: 15,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    content: {
        marginTop: Platform.OS === 'ios' ? 110 : 140,
        padding: 15,
    },
    title: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    description: {
        lineHeight: 25,
        fontSize: 16,
        marginVertical: 8,
    },
    tag: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    image: {
        width: '100%',
        height: 270,
        objectFit: 'contain',
        position: 'absolute',
        backgroundColor: '#4A90E2',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    button: {
        padding: 15,
        backgroundColor: '#4A90E2',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3d4b5a',
    },
})

export default ProductInfo
