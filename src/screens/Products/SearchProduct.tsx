import React from 'react'
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Topbar from '@/src/components/partials/Topbar'
import Product from '@/src/components/products/Product'

const SearchProduct = () => {
    const { results } = useLocalSearchParams()

    const parsedResults = Array.isArray(results) ? results.join(', ') : results

    const products = parsedResults ? JSON.parse(parsedResults) : []

    const renderItem = ({ item }: { item: any }) => (
        <Product
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            price={item.price}
            rating={item.rating}
        />
    )

    return (
        <SafeAreaView>
            <Topbar title="TÌM KIẾM SẢN PHẨM" />
            <View style={styles.section}>
                {products.length > 0 ? (
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                ) : (
                    <Text>Không tìm thấy kết quả nào!</Text>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 175,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
})

export default SearchProduct
