import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Feather from '@expo/vector-icons/Feather'

const Topbar = ({
    title,
    bgColor = 'transparent',
}: {
    title: any
    bgColor: string
}) => {
    const navigation = useNavigation()

    return (
        <View style={[styles.headerContainer, { backgroundColor: bgColor }]}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.conner}
            >
                <Feather
                    name="arrow-left"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
            </TouchableOpacity>
            <Text className="font-bold">{title}</Text>
            <View style={styles.conner}>
                <Feather
                    name="alert-octagon"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conner: {
        backgroundColor: 'rgba(238, 255, 238, 0.30)',
        padding: 5,
        borderRadius: 10,
    },
    icon: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 8,
        shadowColor: '#efefef',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        opacity: 1,
    },
    headerContainer: {
        zIndex: 999,
        height: Platform.OS === 'ios' ? 90 : 85,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default Topbar
