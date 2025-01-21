import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import { searchProducts } from '@/src/services/Product/ProductService'

const SearchInput = () => {
    const [searchText, setSearchText] = useState('')
    const router = useRouter()

    const handleSearch = async () => {
        if (searchText.trim() === '') return

        try {
            const results = await searchProducts(searchText)
            router.push({
                pathname: '/Products/SearchProduct',
                params: { results: JSON.stringify(results) },
            })
        } catch (error) {
            console.error('Error during search:', error)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Feather
                        name="search"
                        size={20}
                        color="#4A90E2"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <Link
                href={'/Notifications/Notification'}
                style={{
                    paddingHorizontal: 15,
                }}
            >
                <Feather name="bell" size={20} color="#4A90E2" />
            </Link>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 10,
        height: 40,
        marginVertical: 10,
        width: '90%',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginLeft: 10,
    },
})

export default SearchInput
