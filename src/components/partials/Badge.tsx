import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Badge = ({
    icon,
    title,
    data,
}: {
    icon: string
    title: string
    data: any
}) => {
    return (
        <View style={styles.badge}>
            <Feather
                name={icon}
                color={'orange'}
                size={16}
                style={styles.icon}
            />
            <View>
                <Text
                    style={{
                        color: 'gray',
                    }}
                >
                    {title}
                </Text>
                <Text style={{ fontWeight: 'bold' }}>{data}</Text>
            </View>
        </View>
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
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
})

export default Badge
