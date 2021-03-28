import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
} from "react-native";
import styles from "./styles/styles";
import { Ionicons } from "@expo/vector-icons";

interface INWProductsResponse {
  // Typescript -interface. Tätä käytetään inventoryItems muuttujassa (json) : https://www.tutorialsteacher.com/typescript/typescript-interface
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

const TuoteDelete = (props: {
  passProductId: any;
  closeModal: any;
  refreshAfterEdit: any;
}) => {
  let ProductId = props.passProductId; // asetetaan propsina tule passProductId muuuttujaan ProductId
  const [ProductName, setProductName] = useState("...");
  const [SupplierId, setSupplierId] = useState("0");
  const [CategoryId, setCategoryId] = useState("0");
  const [QuantityPerUnit, setQuantityPerUnit] = useState("0");
  const [UnitPrice, setUnitPrice] = useState("0");
  const [UnitsInStock, setUnitsInStock] = useState("0");
  const [UnitsOnOrder, setUnitsOnOrder] = useState("0");
  const [ReorderLevel, setReorderLevel] = useState("0");
  const [Discontinued, setDiscontinued] = useState(false);
  const [ImageLink, setImageLink] = useState("");

  useEffect(() => {
    GetProductData();
  }, [props.passProductId]); // ProductId tulee propsina eli kutsuva ohjelma välittää sen tuotteen id:n, jota on klikattu ja tällöin myös useEffect laukeaa

  // tuotetietojen haku ennen deleteä
  // prettier-ignore
  function GetProductData() {
    let uri =
      "https://xxxxxxxxxx.azurewebsites.net/api/products/" + ProductId;
    fetch(uri)
      .then((response) => response.json())
      .then((json: INWProductsResponse) => {
        setProductName(json.productName);
        
        if (json.supplierId !== null) {setSupplierId(json.supplierId.toString());}
        if (json.categoryId !== null) {setCategoryId(json.categoryId.toString());}
        setQuantityPerUnit(json.quantityPerUnit);
        if (json.unitPrice !== null) {setUnitPrice(json.unitPrice.toString());}
        if (json.unitsInStock !== null) {setUnitsInStock(json.unitsInStock.toString());}
        if (json.unitsOnOrder !== null) {setUnitsOnOrder(json.unitsOnOrder.toString());}
        if (json.reorderLevel !== null) {setReorderLevel(json.reorderLevel.toString());}
        setDiscontinued(json.discontinued);
        setImageLink(json.imageLink);
      });
  }

  // Tuotteen poisto tietokannasta funktio
  function DeleteToDB() {
    const apiUrl =
      "https://xxxxxxxxxx.azurewebsites.net/api/products/" + ProductId;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: null,
    })
      .then((response) => response.json())
      .then((json) => {
        const success = json;
        if (success) {
          alert("Palvelimen vastaus: " + success);
        } else {
          alert("Tuotteen " + ProductId + " poistossa tapahtui virhe.");
        }
        props.refreshAfterEdit(true);
        closeModal();
      });
  }

  function closeModal() {
    props.closeModal(true);
  }

  return (
    <View style={styles.inputContainer}>
      <ScrollView>
        <View key={ProductId}>
          <View style={styles.topSection2}>
            <Pressable onPress={() => DeleteToDB()}>
              <View>
                <Ionicons name="trash-outline" size={25} color="green" />
              </View>
            </Pressable>

            <Pressable onPress={() => closeModal()}>
              <View>
                <Ionicons name="md-close-outline" size={25} color="red" />
              </View>
            </Pressable>
          </View>

          <Text style={styles.inputHeaderTitle}>Tuotteen poistaminen:</Text>
          <Text style={styles.inputTitle}>ID:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            defaultValue={ProductId.toString()}
            autoCapitalize="none"
            editable={false}
          />

          <Text style={styles.inputTitle}>Nimi:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={ProductName.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            editable={false}
          />

          <Text style={styles.inputTitle}>Hinta:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={UnitPrice.toString() == null ? "0" : UnitPrice.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Varastossa:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={UnitsInStock.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Hälytysraja:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={ReorderLevel.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Tilauksessa:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={UnitsOnOrder.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Kategoria:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={CategoryId.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={QuantityPerUnit.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={SupplierId.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            editable={false}
          />

          <Text style={styles.inputTitle}>Tuote poistunut:</Text>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <Text style={{ marginRight: 4 }}>Ei</Text>
            <Switch value={Discontinued} />
            <Text style={{ marginLeft: 4 }}>Kyllä</Text>
          </View>

          <Text style={styles.inputTitle}>Kuvan linkki:</Text>
          <TextInput
            style={styles.inputTitle}
            underlineColorAndroid="transparent"
            value={ImageLink == null ? "" : ImageLink.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            editable={false}
          />

          <View style={styles.topSection2}>
            <Pressable onPress={() => DeleteToDB()}>
              <View>
                <Ionicons name="trash-outline" size={35} color="green" />
                <Text>Poista</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => closeModal()}>
              <View>
                <Ionicons name="md-close-outline" size={35} color="red" />
                <Text>Peruuta</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TuoteDelete;
