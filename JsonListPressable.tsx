import React, { useState } from "react";
import { Text, View, FlatList, Button, Pressable } from "react-native";
import styles from "./styles";

export default function JsonListPressable() {
  const [jsonData, setJsonData] = useState(); // jsondata tallennetaan tähän hookkiin

  // Alla datan haku typicodesta fetchillä. SetjsonDatalla asetetetaan se jsonData muuttujaan
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((responseData) => {
        setJsonData(responseData);
      });
  };

  return (
    <View style={styles.padding}>
      <Button
        onPress={() => getData()}
        title="Hae Typicodesta"
        color="#918ab9"
      />
      {/* Nappia painaessa haetaan data eli kutsutaan getData-funktiota */}

      <FlatList // https://reactnative.dev/docs/flatlist
        data={jsonData} // data on jsondata-muuttuja eli se mihin getData-funktion hakema data asetettiin
        keyExtractor={(item) => item.id.toString()} // keyExtractor tells the list to use the ids for the react keys instead of the default key property.
        renderItem={(
          { item } // renderItem takes an item from data and renders it into the list.
        ) => (
          <Pressable // https://reactnative.dev/docs/pressable
            onPress={() => {}}
            style={({ pressed }) => [
              { backgroundColor: pressed ? "rgb(210,230,255)" : "transparent" },
            ]}
          >
            {({ pressed }) => (
              <View>
                <View style={styles.separatorLine} />
                <Text style={styles.text}>
                  {pressed
                    ? "Klikkasit tätä riviä!"
                    : "Paina nähdäsesi lisätietoja"}
                </Text>
                <Text style={styles.text}>
                  {pressed ? "Pääavain = " + item.id.toString() : ""}
                </Text>
                <Text style={styles.itemItalic}>
                  UserId: {item.userId.toString()}
                </Text>
                <Text style={styles.itemBolded}>Title: {item.title}</Text>
                {item.completed === true ? (
                  <Text style={styles.itemUnderlined}>Tehty</Text>
                ) : (
                  <Text style={styles.itemBolded}>Tekemättä</Text>
                )}
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}
