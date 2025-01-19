import {
    View,
    Text,
    Pressable,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '@/constants/icons'
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'

const TabBarButton = ({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label,
}: {
    onPress: (event: GestureResponderEvent) => void
    onLongPress: (event: GestureResponderEvent) => void
    isFocused: boolean
    routeName: keyof typeof icon
    color: string
    label: string
}) => {
    const scale = useSharedValue(0)
    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        )
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
        const top = interpolate(scale.value, [0, 1], [0, 9])
        return {
            transform: [
                {
                    scale: scaleValue,
                },
            ],
            top,
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return {
            opacity,
        }
    })

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
        >
            <Animated.View style={animatedIconStyle}>
                {icon[routeName]({
                    color: isFocused ? '#fff' : '#222',
                })}
            </Animated.View>

            <Animated.Text
                style={[
                    { color: isFocused ? '#673ab7' : '#222', fontSize: 12 },
                    animatedTextStyle,
                ]}
            >
                {label}
            </Animated.Text>
        </Pressable>
    )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: 5,
    },
})
