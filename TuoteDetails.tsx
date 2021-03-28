import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles/styles";

interface INWProductsResponse {
  // Typescript -interface. Tätä käytetään inventoryItems muuttujassa (json)
  productId: number;
  productName: string;
  supplierId: number;
  categoryId: number;
  quantityPerUnit: string;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: boolean;
  imageLink: string;
  category: string;
  supplier: string;
  checked: any;
}

const TuoteDetails = (props: { passProductId: any; closeModal: any }) => {
  const [product, setProduct] = useState<Partial<INWProductsResponse>>({}); // muuttuja joka on tyypiltään tuo yllä luotu interface
  const [ProductId, setProductId] = useState(props.passProductId);

  useEffect(() => {
    GetProductInfo();
  }, [props.passProductId]); // ProductId tulee propsina eli kutsuva ohjelma välittää sen tuotteen id:n, jota on klikattu ja tällöin myös useEffect laukeaa

  function GetProductInfo() {
    let uri = "https://xxxxxxxxxx.azurewebsites.net/api/products/" + ProductId; // productid tullut siis propsina ja asetettu Productid muuttujaan (hook)
    fetch(uri)
      .then((response) => response.json())
      .then((json: INWProductsResponse) => {
        // json interface mukausta
        setProduct(json); // Tuote hookilla product muuttujaan (tyypiltään interface)
      });
  }

  function closeModal() {
    props.closeModal(true);
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Tuotteen tiedot</Text>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Product Id: "}</Text>
          <Text style={styles.modalText}>{product.productId}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Product Name: "}</Text>
          <Text style={styles.modalText}>{product.productName}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Supplier Id: "}</Text>
          <Text style={styles.modalText}>{product.supplierId}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Category Id: "}</Text>
          <Text style={styles.modalText}>{product.categoryId}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Quantity Per Unit: "}</Text>
          <Text style={styles.modalText}>{product.quantityPerUnit}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Unit Price: "}</Text>
          <Text style={styles.modalText}>{product.unitPrice}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Units In Stock: "}</Text>
          <Text style={styles.modalText}>{product.unitsInStock}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Units On Order: "}</Text>
          <Text style={styles.modalText}>{product.unitsOnOrder}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Reorder Level: "}</Text>
          <Text style={styles.modalText}>{product.reorderLevel}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Discontinued: "}</Text>
          <Text style={styles.modalText}>
            {product.discontinued ? product.discontinued.toString() : "false"}
          </Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalTextTitle}>{"Image: "}</Text>
        </View>
        <Image
          source={
            product.imageLink
              ? { uri: product.imageLink }
              : { uri: "https://www.tibs.org.tw/images/default.jpg" }
          }
          style={[
            styles.centerElement,
            {
              height: 60,
              width: 60,
              backgroundColor: "#eee",
              margin: 6,
              alignSelf: "center",
            },
          ]}
        />

        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "darkslateblue" }}
          onPress={() => {
            closeModal();
            // setProductDetailsModal(!productDetailsModal);
          }}
        >
          <Text style={styles.textStyle}>Sulje</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default TuoteDetails;
