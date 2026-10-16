import React, { useRef, useState } from "react";
import {
  View,
  Button,
  Image,
  Text
} from "react-native";

import {
  CameraView,
  useCameraPermissions
} from "expo-camera";

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraScreen() {

  const cameraRef = useRef(null);

  const [photo,setPhoto] = useState(null);

  const [permission,requestPermission] =
  useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Button
        title="Permitir Cámara"
        onPress={requestPermission}
      />
    );
  }

  const takePhoto = async () => {

    const result =
    await cameraRef.current.takePictureAsync();

    const locationPermission =
      await Location.requestForegroundPermissionsAsync();

    if(locationPermission.status !== "granted"){
      alert("GPS denegado");
      return;
    }

    const location =
      await Location.getCurrentPositionAsync({});

    const viaje = {
      photo: result.uri,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      date: new Date().toLocaleString()
    };

    const stored =
      await AsyncStorage.getItem("viajes");

    let viajes = stored ? JSON.parse(stored) : [];

    viajes.push(viaje);

    await AsyncStorage.setItem(
      "viajes",
      JSON.stringify(viajes)
    );

    setPhoto(result.uri);

    alert("Viaje guardado");
  };

  return (
    <View style={{flex:1}}>

      <CameraView
        ref={cameraRef}
        style={{flex:1}}
      />

      <Button
        title="Tomar Foto"
        onPress={takePhoto}
      />

      {photo && (
        <Image
          source={{uri:photo}}
          style={{
            width:200,
            height:200,
            alignSelf:"center"
          }}
        />
      )}

    </View>
  );
}