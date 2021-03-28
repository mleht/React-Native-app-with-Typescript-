import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //Defaults
  container: {
    marginTop: 12,
    width: "80%",
  },
  flexLayout: {
    marginTop: 22,
    flex: 1,
  },

  //StyleExampleExternal.tsx
  bigOrange: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 22,
  },
  green: {
    color: "green",
  },

  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },

  scrollView2: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },

  text: {
    color: "blue",
    fontSize: 12,
  },

  padding: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },

  //ScrollViewExample.tsx
  scrollText: {
    fontSize: 12,
  },
  textButton: {
    backgroundColor: "green",
  },

  //JsonList.tsx
  itemItalic: {
    fontStyle: "italic",
  },
  itemBolded: {
    fontWeight: "bold",
  },
  itemUnderlined: {
    textDecorationLine: "underline",
  },

  logoCareeria: {
    width: 230,
    height: 67,
    margin: 12,
  },

  separatorLine: {
    marginVertical: 5,
    height: 1,
    width: "100%",
    backgroundColor: "white",
  },
});

export default styles;
