import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather'

const SearchInput = () => {
    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor="#999"
                />
                <Feather
                    name="search"
                    size={20}
                    color="#4A90E2"
                    style={styles.icon}
                />
            </View>
            <Feather
                name="bell"
                size={20}
                color={'#4A90E2'}
                style={{
                    paddingHorizontal: 15,
                }}
            />
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
