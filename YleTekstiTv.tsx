import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { API_id, API_key } from "./APIKey";
import { Ionicons } from "@expo/vector-icons";

// Put your personal Api keys to APIKey.ts ( https://developer.yle.fi/en/index.html )

export default function YleTekstiTv() {
  const [imageUrl, setUrl] = useState<string>();
  const [inputPage, changeInputPage] = useState(100); // alkuarvo eli ensimmäinen sivu sata
  const [alaSivu, changeAlaSivu] = useState(1); // alkuarvo eli ensimmäinen alasivu 1
  const [alaSivuja, changeAlaSivuja] = useState(1); // alasivujen kokonäismäärä

  var imageUrl2 =
    "https://external.api.yle.fi/v1/teletext/images/" +
    inputPage +
    "/" +
    alaSivu +
    ".png?app_id=" +
    API_id +
    "&app_key=" +
    API_key +
    Math.floor(Math.random() * 100000);
  // vaihtuva numero perässä pakottaa hakemaan uuden sivun cachesta huolimatta
  // yllä koostetaan osoite hakemaan yle tekstitv sivu apista

  var yleJson =
    "https://external.api.yle.fi/v1/teletext/pages/" +
    inputPage +
    ".json?app_id=" +
    API_id +
    "&app_key=" +
    API_key;

  function HaeYleJson() {
    fetch(yleJson, {
      method: "GET",
      cache: "no-cache",
    })
      // fetch komento saa parametriksi ylempänä asetetun web-osoitteen
      .then((response) => response.json())
      .then((json) => {
        var subpages = json.teletext.page.subpage.length;
        // Json datasta etsitään sivujen lukumäärä ja tallentetaan subpages muuttujaan
        changeAlaSivuja(subpages); // Alasivujen lukumäärä hooksilla alasivuja muuttujaan
      });
  }

  useEffect(() => {
    fetch(imageUrl2, { cache: "no-cache" }).then(function (response) {
      var responseData = response.status;
      if (responseData === 404) {
        // jos sivua ei ole näytetään vanha "virityskuva", muutoin taas yle apin palauttama kuva
        setUrl(
          "https://upload.wikimedia.org/wikipedia/fi/thumb/a/a3/Testikuva-YLE2-1990-03.jpg/360px-Testikuva-YLE2-1990-03.jpg"
        );
        changeAlaSivuja(1);
      } else {
        HaeYleJson();
        setUrl(imageUrl2);
      }
    });
  }, [inputPage, alaSivu]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewPage}>
        <Text style={styles.title}>Ylen tekstitv</Text>
        <View style={styles.separatorLine} />

        <View style={styles.searchSection}>
          {/* prettier-ignore */}
          <Ionicons name="arrow-back" size={35} color="darkslateblue" onPress={() => {changeInputPage(inputPage - 1); changeAlaSivu(1);}}/>
          {/* <Button title="<<" onPress={() => { changeInputPage(inputPage - 1); changeAlaSivu(1);}}/> */}
          <TextInput
            maxLength={3}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "white",
              fontSize: 22,
              textAlign: "center",
              margin: 2,
              width: 240,
            }}
            onChangeText={(text) => {
              changeInputPage(Number(text));
              changeAlaSivu(1);
            }} // eli menee inputPage muuttujaan tällä hookilla onChange yhteydessä
            value={inputPage.toString()}
          />
          {/* prettier-ignore */}
          <Ionicons name="arrow-forward" size={35} color="darkslateblue" onPress={() => {changeInputPage(inputPage + 1); changeAlaSivu(1);}}/>
          {/* <Button title=">>" onPress={() => { changeInputPage(inputPage + 1); changeAlaSivu(1);}}/> */}
        </View>
        {/* prettier-ignore */}
        <View style={styles.alaSivu}>
          {alaSivu > 1 ? ( <Button color="#918ab9" title="< alasivu" onPress={() => changeAlaSivu(alaSivu - 1)}/>) : null}
          {alaSivu < alaSivuja ? (<Button color="#918ab9" title="alasivu >" onPress={() => changeAlaSivu(alaSivu + 1)}/>) : null}
        </View>

        <View style={styles.imageSection}>
          {/* prettier-ignore */}
          <Image style={styles.yleTextTV} resizeMode={"contain"} source={{ uri: imageUrl,}}/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e6e6fa",
  },

  scrollViewPage: {
    alignItems: "center",
    paddingTop: 20,
  },

  imageSection: {
    flex: 2,
  },

  searchSection: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row", // napit ja hakukenttä samalle riville
  },

  alaSivu: {
    flexDirection: "row", // napit samalle riville
  },

  yleTextTV: {
    width: "100%",
    height: Platform.OS === "android" ? "100%" : 240,
    aspectRatio: 1.5,
    marginTop: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "300",
    letterSpacing: 7,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: "#D1D1D1",
    textAlign: "center",
  },

  separatorLine: {
    marginVertical: 5,
    height: 1,
    width: "100%",
    backgroundColor: "white",
  },
});
