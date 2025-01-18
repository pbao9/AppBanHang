import React, { useState } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

interface SliderImage {
    id: number
    asset: any
    title: string
}

const images: SliderImage[] = [
    {
        id: 1,
        asset: require('../../assets/images/banner_1.png'),
        title: 'Image 1',
    },
    {
        id: 2,
        asset: require('../../assets/images/banner_2.png'),
        title: 'Image 2',
    },
    {
        id: 3,
        asset: require('../../assets/images/banner_3.png'),
        title: 'Image 3',
    },
    {
        id: 4,
        asset: require('../../assets/images/banner_4.png'),
        title: 'Image 4',
    },
]

const { width } = Dimensions.get('window')

const Slider = () => {
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={3}
                loop={true}
                showsPagination={true}
                dotColor="rgba(0, 0, 0, 0.2)"
                activeDotColor="#673ab7"
            >
                {images.map((item) => (
                    <View key={item.id} style={styles.sliderItem}>
                        <Image
                            source={item.asset}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 180,
        marginBottom: 20,
    },
    wrapper: {
        height: '100%',
    },
    sliderItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

export default Slider
