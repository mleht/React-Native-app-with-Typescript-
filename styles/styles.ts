import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //Pääohjelman (NWTuotteetListModular tai aikaisemman version) tyylit
  mainWrapper: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6e6fa",
    padding: 20,
  },
  topSection2: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
  },
  topSection3: {
    backgroundColor: "#e6e6fa",
  },
  pickerSection: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#e6e6fa",
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
  },
  centerSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerElement: {
    justifyContent: "center",
    alignItems: "center",
  },
  productsContainer: {
    flexDirection: "row",
    marginBottom: 2,
    height: 120,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f0f0fc",
  },

  //EditProduct.tsx -tyylimääritykset
  inputContainer: {
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    elevation: 10,
  },

  inputContainerTest: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    width: "100%",
    paddingTop: 23,
    height: "auto",
  },
  inputHeaderTitle: {
    margin: 15,
    fontWeight: "bold",
    fontSize: 24,
  },
  inputTitle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
  },
  editInput: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    color: "black",
  },
  inactiveField: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    color: "gray",
  },

  submitButton: {
    backgroundColor: "#3AC730",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },

  validationError: {
    color: "red",
    marginLeft: 15,
  },

  //MODAL -tyylimääritykset
  centeredView: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    display: Platform.OS === "web" ? "none" : undefined,
    position: Platform.OS === "web" ? "relative" : undefined,
    width: Platform.OS === "web" ? "100%" : undefined,
    height: Platform.OS === "web" ? "100%" : undefined,
    zIndex: Platform.OS === "web" ? 1 : undefined,
    backgroundColor: "transparent",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 8,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
  },
  modalTextTitle: {
    marginBottom: 15,
    fontWeight: "bold",
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
