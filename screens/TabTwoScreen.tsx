import * as React from "react";

import { Text, View } from "../components/Themed";

import EditScreenInfo from "../components/EditScreenInfo";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function TabTwoScreen() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Tab Two</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    // </View>
    <WebView
      source={{ uri: "https://bitcoinmagazine.com/price" }}
      // style={{ marginTop: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
