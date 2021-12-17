import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Slider from '@react-native-community/slider';

import songs from "../modal/data";

const { width, height } = Dimensions.get('window');

export default function Music() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);

    const songSlider = useRef(null)
    useEffect(() => {
        scrollX.addListener(({ value }) => {
            // console.log('Scroll X', scrollX);
            // console.log('Device Width', width);
            const index = Math.round(value / width);

            setSongIndex(index)
            // console.log('Index: ', index);
        });
        return () => {
            scrollX.removeListeners();
        }
    }, [])

    const skipNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    }

    const skipPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    }

    const renderSongs = ({ index, item }) => {
        return (
            <Animated.View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={styles.Wrapper}>
                    <Image
                        source={item.image}
                        style={styles.img}
                    />
                </View>
            </Animated.View>

        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <View style={{ width: width }}>
                    <Animated.FlatList
                        ref={songSlider}
                        data={songs}
                        renderItem={renderSongs}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: { x: scrollX }
                                }
                            }],
                            { useNativeDriver: true }
                        )}
                    />
                </View>

                <View>
                    <Text style={styles.title}>{songs[songIndex].title}</Text>
                    <Text style={styles.artist}>{songs[songIndex].artist}</Text>
                </View>

                <View>
                    <Slider style={styles.progress}
                        value={10}
                        minimumValue={0}
                        maximumValue={100}
                        thumbTintColor="#4169E1"
                        minimumTrackTintColor="#4169E1"
                        maximumTrackTintColor="#696969"
                        onSlidingComplete={() => { }}
                    />
                </View>

                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabelText}>0:00</Text>
                    <Text style={styles.progressLabelText}>5:15</Text>
                </View>

                <View style={styles.musicControl}>
                    <TouchableOpacity onPress={skipPrevious}>
                        <Icon name="play-skip-back-outline" color="#363636" size={35} style={{ marginTop: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="ios-pause-circle" color="#363636" size={75} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipNext}>
                        <Icon name="play-skip-forward-outline" color="#363636" size={35} style={{ marginTop: 25 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.borderControl}>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="heart-outline" color="#363636" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="repeat" color="#363636" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="share-outline" color="#363636" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="ellipsis-horizontal" color="#363636" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF'
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        borderTopColor: '#363636',
        borderTopWidth: 1,
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#F8F8FF'
    },
    borderControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    Wrapper: {
        width: 300,
        height: 325,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.50,
        elevation: 5
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#363636'
    },
    artist: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#363636'
    },
    progress: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressLabelText: {
        color: '#363636'
    },
    musicControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 15
    }
});