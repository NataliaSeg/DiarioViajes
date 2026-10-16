import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen() {
  const [viajes, setViajes] = useState([]);

  const cargarViajes = async () => {
    try {
      const data = await AsyncStorage.getItem("viajes");

      if (data) {
        setViajes(JSON.parse(data));
      } else {
        setViajes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarViajes();
    }, [])
  );

  const borrarHistorial = async () => {
    try {
      await AsyncStorage.removeItem("viajes");
      setViajes([]);
      alert("Historial eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📚 Historial de Viajes
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={borrarHistorial}
      >
        <Text style={styles.deleteButtonText}>
          🗑️ Borrar Historial
        </Text>
      </TouchableOpacity>

      {viajes.length === 0 ? (
        <Text style={styles.emptyText}>
          No hay viajes registrados.
        </Text>
      ) : (
        <FlatList
          data={viajes}
          keyExtractor={(item, index) =>
            index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.photo }}
                style={styles.image}
              />

              <Text style={styles.text}>
                📅 Fecha: {item.date}
              </Text>

              <Text style={styles.text}>
                📍 Latitud: {item.latitude}
              </Text>

              <Text style={styles.text}>
                📍 Longitud: {item.longitude}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#2563EB",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,

    ...(Platform.OS === "android"
      ? {
          elevation: 8,
        }
      : {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        }),
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});