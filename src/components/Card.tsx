import React from 'react'
import { Image, Text, View } from 'react-native'

const Card = ({
    title,
    price,
    category,
    image,
}: {
    title: string
    price: string
    category: string
    image: string
}) => {
    return (
        <View className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden">
            <View className="p-4">
                {image && (
                    <Image
                        source={{ uri: image }}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                )}
                <Text className="text-2xl font-semibold text-gray-800 mb-3">
                    {title}
                </Text>
                <Text className="text-gray-600">Danh mục: {category}</Text>
            </View>
            <View className="bg-gray-100 p-4">
                <Text className="text-gray-600">Giá thành: {price}$</Text>
            </View>
        </View>
    )
}

export default Card
