import React, {useRef} from 'react';
import {Animated, Button, StyleSheet,TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen({navigation,route}: any) {
    const [selectedImage, setSelectedImage] = React.useState(null);


    const fadeAnim = useRef(new Animated.Value(0)).current;

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

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if(pickerResult.cancelled){
            return;
        }
        // @ts-ignore
        setSelectedImage({localUri: pickerResult.uri});
    };

    let openShareDialogAsync = async () =>{
        if(!(await Sharing.isAvailableAsync())){
            alert(`Ops! Sharing isn't available on your platform`);
            return
        }
        await Sharing.shareAsync(selectedImage.localUri);
    };

    if (selectedImage !== null){
        // @ts-ignore
        return(
            <View style={styles.container}>
                <Image
                    source={{uri: selectedImage.localUri}}
                    style={styles.thumbnail} />
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around',}}>

                            <TouchableOpacity onPress={openShareDialogAsync} style={{...styles.button,width: 200, height: 100,}}>
                        <Text style={styles.buttonText}>Share this photo</Text>
                    </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.push('TabOneScreen')} style={{...styles.button,  backgroundColor: "red",width: 200, height: 100,}}>
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>

            </View>
        );
    }


    return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/*<EditScreenInfo
          path="/screens/TabOneScreen.tsx" />*/}
        <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={{ width: 305, height: 159}} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={{ backgroundColor: 'grey' }}>
            <Text style={{ fontSize: 36, color: '#fff' }}>Pick a photo</Text>
        </TouchableOpacity>

      <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim // Bind opacity to animated value
            }
          ]}
      >
          <Image
              source={{ uri: "https://www.thesprucepets.com/thmb/nuRZVBLSTh8yjg7Z6ATVnQZ2vLU=/1927x1445/smart/filters:no_upscale()/GettyImages-626916125-5b3a4a8046e0fb00379f682d.jpg" }}
              style={{ width: 305, height: 159}} />
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />
       <Button title="Fade Out" onPress={fadeOut} />
      </View>



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
    //backgroundColor: "powderblue"
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
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    button: {
        backgroundColor: "green",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignContent:'center'
    },
});
