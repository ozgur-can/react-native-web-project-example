import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PostScreen from "./components/PostScreen";
class App extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Create React Native Web App</Text>
        <PostScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
