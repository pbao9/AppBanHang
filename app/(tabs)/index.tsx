import Card from '@/components/Card'
import ProductCategory from '@/components/products/ProductCategory'
import ProductList from '@/components/products/ProductList'
import Slider from '@/components/slider/Slider'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
export default function Page() {
    const sections = [
        {
            id: '1',
            title: 'Sản phẩm xe moto',
            component: <ProductCategory category="motorcycle" />,
        },
        {
            id: '2',
            title: 'Sản phẩm nổi bật',
            component: <ProductList />,
        },
    ]

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.section}>
            <Text style={styles.title}>{item.title}</Text>
            {item.component}
        </View>
    )

    const renderHeader = () => (
        <>
            <Slider />
        </>
    )

    return (
        <FlatList
            data={sections}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader} // Add the header (Slider and Image)
            style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    section: {
        padding: 16,
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
})
