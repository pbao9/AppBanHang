// ProductInfo.tsx
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native'
import Product from '@/src/types/Product'
import Topbar from '../partials/Topbar'
import { useNavigation } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import Badge from '../partials/Badge'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const imageUrl = Array.isArray(product.images)
        ? product.images[0]
        : product.images
    const navigation = useNavigation()
    return (
        <ScrollView>
            <Topbar title={product.title} />
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{product.title}</Text>
                <Text>SKU: {product.sku}</Text>
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
                    <Badge
                        title="QuAnh"
                        icon="box"
                        data={product.minimumOrderQuantity}
                    />
                    <Badge
                        title="Stock"
                        icon="box"
                        data={product.minimumOrderQuantity}
                    />
                    <Badge
                        title="Hel"
                        icon="box"
                        data={product.minimumOrderQuantity}
                    />
                </View>
                <Text style={styles.description}>{product.description}</Text>
                <View
                    className="flex justify-between flex-row"
                    style={styles.containerFlex}
                >
                    <Text style={styles.button}>Liên hệ</Text>
                    <Text style={styles.button}>${product.price}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icon: {
        padding: 10,
        backgroundColor: 'rgba(228, 224, 225, 0.8)',
        borderRadius: 10,
    },
    badge: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    tag: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerFlex: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    content: {
        marginTop: Platform.OS === 'ios' ? 110 : 140,
        padding: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        lineHeight: 25,
        fontSize: 16,
        marginVertical: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3d4b5a',
    },
    image: {
        width: '100%',
        objectFit: 'contain',
        height: 270,
        marginBottom: 0,
        position: 'absolute',
        backgroundColor: 'red',
    },
    button: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        color: 'white',
        fontWeight: 'bold',
    },
})

export default ProductInfo
