import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Magnetometer } from "expo-sensors";

export default function CompassScreen() {
  const [heading, setHeading] = useState(0);

  const getDirection = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return "Norte 🧭";
    if (deg >= 22.5 && deg < 67.5) return "Noreste ↗️";
    if (deg >= 67.5 && deg < 112.5) return "Este ➡️";
    if (deg >= 112.5 && deg < 157.5) return "Sureste ↘️";
    if (deg >= 157.5 && deg < 202.5) return "Sur ⬇️";
    if (deg >= 202.5 && deg < 247.5) return "Suroeste ↙️";
    if (deg >= 247.5 && deg < 292.5) return "Oeste ⬅️";
    return "Noroeste ↖️";
  };

  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let angle = Math.atan2(data.y, data.x);

      angle = angle * (180 / Math.PI);

      if (angle < 0) {
        angle += 360;
      }

      setHeading(Math.round(angle));
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Brújula</Text>

      <Text style={styles.degree}>
        {heading}°
      </Text>

      <Text style={styles.direction}>
        {getDirection(heading)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  degree: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2563EB",
  },

  direction: {
    fontSize: 24,
    marginTop: 15,
  },
});