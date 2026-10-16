import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          📸 Diario de Viajes
        </Text>

        <Text style={styles.description}>
          Guarda fotos, ubicación GPS y fecha de cada viaje.
        </Text>

        <Text style={styles.info}>
          🧭 Sensor utilizado: Magnetómetro (Brújula)
        </Text>

        <Text style={styles.info}>
          📱 Sistema Operativo: {Platform.OS}
        </Text>

        <Text style={styles.info}>
          📅 Fecha actual: {new Date().toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,

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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2563EB",
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },

  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },

});