import React, {useRef} from 'react';
import {Animated, Button, StyleSheet,Image, PanResponder} from 'react-native';
import Draggable from 'react-native-draggable';
import Swiper from 'react-native-swiper';
// @ts-ignore
import ViewControl from 'react-native-zoom-view';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";

export default function ProjectScreen({navigation}) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const pan = useRef(new Animated.ValueXY()).current

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // @ts-ignore
                // @ts-ignore
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ]
            ),
            onPanResponderRelease: () => {
                Animated.spring(pan,{
                    useNativeDriver: false,
                    toValue: 0
                }).start();
            }
        })
    ).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            useNativeDriver: false,
            toValue: 1,
            duration: 1000
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
            useNativeDriver: false,
            toValue: 0,
            duration: 1000
        }).start();
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Project</Text>
            <Draggable
                       onLongPress={() => console.log('longPress')}
                       x={100} y={200} renderColor='grey' renderText='B'/>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
           {/* <EditScreenInfo path="/screens/Project.tsx" />
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        opacity: fadeAnim // Bind opacity to animated value
                    }
                ]}
            >
                <Text style={styles.fadingText}>Fading View!</Text>
            </Animated.View>
            <View style={styles.buttonRow}>
                <Button title="Fade In" onPress={fadeIn} />
                <Button title="Fade Out" onPress={fadeOut} />
            </View>*/}

            <View>
                <Text style={styles.titleText}>Drag this hedgehog</Text>
            </View>
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }]
                }}
                {...panResponder.panHandlers}
            >
                <Text style={styles.fadingText}>Hello! How are you? ~</Text>
                <Image source={{uri:'https://www.thesprucepets.com/thmb/nuRZVBLSTh8yjg7Z6ATVnQZ2vLU=/1927x1445/smart/filters:no_upscale()/GettyImages-626916125-5b3a4a8046e0fb00379f682d.jpg'}}
                       style={{width:400, height:400}}>

                </Image>
            </Animated.View>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28,
        textAlign: "center",
        margin: 10
    },
    buttonRow: {
        flexDirection: "row",
        marginVertical: 16
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 100,
        width: 100,
        backgroundColor: "grey",
        borderRadius: 5
    }
});
