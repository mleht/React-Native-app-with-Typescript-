import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native"; //Navigaatio-komponentti
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

// alla omat komponentit
import YleTekstiTv from "./YleTekstiTv";
import JsonListPressable from "./JsonListPressable";
import Home from "./Home";
import TuotteetListModular from "./TuotteetListModular";

export default function App() {
  const Tab = createMaterialTopTabNavigator(); // Swipe navi Tab-nimiseen muuttujaan
  const iconSize = 24;

  return (
    <NavigationContainer>
      {/* https://reactnavigation.org/docs/material-top-tab-navigator/ */}
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#322a61",
          inactiveTintColor: "#000000",
          showLabel: true,
          labelStyle: { fontSize: 10 },
          showIcon: true,
          // scrollEnabled: true - Whether the tab column can be scrolled (when the total number of tabs exceeds one screen)
          indicatorStyle: { backgroundColor: "#8C8CAA", height: 5 },
          style: { backgroundColor: "#bcbcf2", paddingTop: 40 },
        }}
      >
        {/* Ilman ikonia laitettaisiin vain näin <Tab.Screen name="HelloWorld" component={HelloWorld} /> */}

        {/* prettier-ignore */}
        <Tab.Screen name="Etusivu" component={Home} options={{ tabBarIcon: () => (<Ionicons name="home-outline" color="black" size={iconSize} />),}}/>
        {/* prettier-ignore */}
        <Tab.Screen name="Typicode" component={JsonListPressable} options={{ tabBarIcon: () => (<Ionicons name="list-circle-outline" color="black" size={iconSize}/>),}}/>
        {/* prettier-ignore */}
        <Tab.Screen name="TekstiTv" component={YleTekstiTv} options={{ tabBarIcon: () => (<Ionicons name="newspaper-outline" color="black" size={iconSize}/>),}}/>
        {/* prettier-ignore */}
        <Tab.Screen name="NW Tuotteet" component={TuotteetListModular} options={{ tabBarIcon: () => (<Ionicons name="file-tray-full-outline" color="black" size={iconSize} />),}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
