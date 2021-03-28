import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface head {
  title: string;
}
const Home = ({ title }: head) => {
  return (
    <View style={styles.padding}>
      <Image style={styles.logo} source={require("./img/logo.png")} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

Home.defaultProps = {
  title: "Tervetuloa",
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  padding: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#a9a9d9",
    alignItems: "center",
  },
});

export default Home;
