import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  TextInput,
  Switch,
} from "react-native";
import styles from "./styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; // https://github.com/react-native-picker/picker

interface INWCategories {
  // Typescript -interface kategorioita varten
  categoryId: number;
  categoryName: string;
}

interface INWSuppliers {
  // Typescript -interface kategorioita varten
  supplierId: number;
  companyName: string;
}

const TuoteCreate2 = (props: { closeModal: any; refreshAfterEdit: any }) => {
  const [ProductName, setProductName] = useState("");
  const [QuantityPerUnit, setQuantityPerUnit] = useState("0");
  const [UnitPrice, setUnitPrice] = useState("0");
  const [UnitsInStock, setUnitsInStock] = useState("0");
  const [UnitsOnOrder, setUnitsOnOrder] = useState("0");
  const [ReorderLevel, setReorderLevel] = useState("0");
  const [Discontinued, setDiscontinued] = useState(false);
  const [ImageLink, setImageLink] = useState("");
  const [categories, setCategories] = useState<any>([]); // categories pudostusvalikkoa varten
  const [selectedCat, setSelectedCat] = useState<any>(); // categories pudostusvalikkoa varten
  const [suppliers, setSuppliers] = useState<any>([]); // supplier pudotusvalikkoa varten
  const [selectedSupplier, setSelectedSupplier] = useState<any>(); // supplier pudotusvalikkoa varten

  useEffect(() => {
    GetCategories();
    GetSuppliers();
  }, []);

  // kategorioiden hakeminen
  function GetCategories() {
    let uri =
      "https://xxxxxxxxxx.azurewebsites.net/api/categories/getcategories";
    fetch(uri)
      .then((response) => response.json()) // parse the response as JSON
      .then((json: INWCategories) => {
        // json interfacen muotoa
        setCategories(json); // Kategoriat hookilla categories - array muuttujaan
      });
  }

  // label & value mappays pudotusvalikkoa varten
  const categoriesList = categories.map((cat: INWCategories, index: any) => {
    return (
      <Picker.Item
        label={cat.categoryId + " " + cat.categoryName}
        value={cat.categoryId}
        key={index}
      />
    );
  });

  // Toimittajien hakeminen
  function GetSuppliers() {
    let uri = "https://xxxxxxxxxx.azurewebsites.net/api/suppliers/getsuppliers";
    fetch(uri)
      .then((response) => response.json()) // parse the response as JSON
      .then((json: INWSuppliers) => {
        // json interfacen muotoa
        setSuppliers(json); // Kategoriat hookilla categories - array muuttujaan
      });
  }

  // label & value mappays pudotusvalikkoa varten
  const suppliersList = suppliers.map((supp: INWSuppliers, index: any) => {
    return (
      <Picker.Item
        label={supp.supplierId + " " + supp.companyName}
        value={supp.supplierId}
        key={index}
      />
    );
  });

  // Kun painamme vihre???? "ok/tallennusmerkki??" tallennusikkunassa niin kutsutaan t??t??
  // Jos validateOnSubmit validaatio on false ei tehd?? mit????n (validateOnSubmit palauttaisi alertteja t??ll??in)
  // Muutoin kutsutaan PostToDB-funkitota, jossa l??hete????n uuden tuotteen tiedot tiedot kantaan
  async function createProductOnPress(ProductName: string) {
    if (Platform.OS === "web") {
      if (validateOnSubmit() == false) {
      } else {
        PostToDB();
        /*   console.log("Tuote " + ProductName + " lis??tty onnistuneesti");
        closeModalAndRefresh(); */
      }
    } else {
      if (validateOnSubmit() == false) {
      } else {
        PostToDB();
        // alert("Tuote " + ProductName + " lis??tty onnistuneesti!");
        // closeModalAndRefresh();
      }
    }
  }

  // Funktio jossa l??hetet????n (hookseista tulevat) tiedot tietokantaan
  function PostToDB() {
    const product = {
      ProductName: ProductName,
      SupplierID: Number(selectedSupplier),
      CategoryID: Number(selectedCat),
      QuantityPerUnit: QuantityPerUnit,
      UnitPrice: parseFloat(Number(UnitPrice).toFixed(2)),
      UnitsInStock: Number(UnitsInStock),
      UnitsOnOrder: Number(UnitsOnOrder),
      ReorderLevel: Number(ReorderLevel),
      Discontinued: Boolean(Discontinued),
      ImageLink: ImageLink,
    };

    // Yll?? koottu product muutetaan t??ss??JSON-string -tyyppiseksi, joka l??hetet????n kantaan
    const newprodJson = JSON.stringify(product);

    const apiUrl = "https://xxxxxxxxxx.azurewebsites.net/api/products/";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: newprodJson, // l??hetet????n jsoniksi muutettu data bodyssa kantaan
    })
      .then((response) => response.json())
      .then((json) => {
        const success = json;
        if (success) {
          alert("Palvelimen vastaus: " + success);
        } else {
          alert("Virhe lis??tess?? tuotetta " + ProductName);
        }
        closeModalAndRefresh();
      });
  }

  function closeModal() {
    props.closeModal(true);
  }

  function closeModalAndRefresh() {
    props.closeModal();
    props.refreshAfterEdit();
  }

  // URL validaatio, k??y my??s tyhj??. Jos kirjoitusta, niin pit???? olla oikean muotoista
  function validateUrl(val: any) {
    if (val === null) {
      return true;
    } else {
      var rgx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=_%.]+(?:png|jpg|jpeg|gif|svg)+$/;
      if (val.match(rgx)) {
        return true;
      }
      if (val == "") {
        return true;
      } else {
        return false;
      }
    }
  }

  // Hinnan validaatio
  function validatePrice(val: any) {
    if (val === null) {
      return true;
    } else {
      var rgx = /^[0-9]*\.?[0-9]*$/;
      if (String(val).match(rgx) == null) {
        return false;
      } else {
        return true;
      }
    }
  }

  // Merkkijonon validaation (MAX 70 merkki??)
  function validateString(val: any) {
    if (val === "") {
      return false;
    } else {
      var rgx = /^.{1,70}$/;
      if (val.match(rgx) == null) {
        return false;
      } else {
        return true;
      }
    }
  }

  // Numero -validaatio (ensimm??inen numero ei voi olla 0, jos on enemm??n numeroita kuin 1)
  function validateNumeric(val: any) {
    if (val === null) {
      return true;
    } else {
      var rgx = /^[1-9][0-9]*$/;
      if (String(val).match(rgx)) {
        return true;
      }
      if (val == "0") {
        return true;
      } else {
        return false;
      }
    }
  }

  // createProductOnPress kutsuu t??t?? ja odottaa true/false vastausta (jatkaa vain truella)
  // T??m?? validioi eri kent??t ja palauttaa falsen heti jos j??rjestyksess?? ensimm??inen ei mene if lauseesta l??pi. Jos kaikki menev??t l??pi palauttaa true
  // Validioinnissa t??m?? kutsuu eri funkitoita kuten validateString, validatePrice jne.
  function validateOnSubmit() {
    if (!validateString(ProductName)) {
      alert("Tarkista tuotteen nimi!");
      return false;
    } else if (!validatePrice(UnitPrice)) {
      alert("Tarkista tuotteen hinta!");
      return false;
    } else if (!validateNumeric(UnitsInStock)) {
      alert("Tarkista tuotteen varastom????r??");
      return false;
    } else if (!validateNumeric(ReorderLevel)) {
      alert("Tarkista tuotteen h??lytysraja! (kokonaisuku)");
      return false;
    } else if (!validateNumeric(UnitsOnOrder)) {
      alert("Tarkista tuotteen tilauksessa oleva m????r??! (kokonaisluku)");
      return false;
    } else if (!validateString(QuantityPerUnit)) {
      alert("Tarkista tuotteen pakkauksen koko!");
      return false;
    } else if (!validateUrl(ImageLink)) {
      alert("Tarkista kuvalinkki!");
      return false;
    } else {
      return true;
    }
  }

  return (
    <View style={styles.inputContainer}>
      <ScrollView>
        <View>
          <View style={styles.topSection2}>
            <Pressable onPress={() => createProductOnPress(ProductName)}>
              <View>
                <Ionicons name="save-outline" size={25} color="green" />
              </View>
            </Pressable>

            <Pressable onPress={() => closeModal()}>
              <View>
                <Ionicons name="md-close-outline" size={25} color="red" />
              </View>
            </Pressable>
          </View>

          <Text style={styles.inputHeaderTitle}>Tuotteen lis??ys:</Text>

          <Text style={styles.inputTitle}>Nimi:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setProductName(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            selectTextOnFocus={true}
          />
          {/* { ProductName ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}   */}
          {validateString(ProductName) == true ? null : (
            <Text style={styles.validationError}>Anna tuotteen nimi!</Text>
          )}

          <Text style={styles.inputTitle}>Hinta:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setUnitPrice(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          />
          {/* { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )} */}
          {validatePrice(UnitPrice) == true ? null : (
            <Text style={styles.validationError}>
              Anna hinta muodossa n.zz!
            </Text>
          )}

          <Text style={styles.inputTitle}>Varastossa:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setUnitsInStock(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          />
          {validateNumeric(UnitsInStock) == true ? null : (
            <Text style={styles.validationError}>
              Anna varastom????r??ksi numero
            </Text>
          )}

          <Text style={styles.inputTitle}>H??lytysraja:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setReorderLevel(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          />

          <Text style={styles.inputTitle}>Tilauksessa:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setUnitsOnOrder(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          />

          {/*  <Text style={styles.inputTitle}>Kategoria:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setCategoryId(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          /> */}

          <Text style={styles.inputTitle}>Tuoteryhm??:</Text>
          <Picker
            prompt="Valitse tuoteryhm??"
            selectedValue={selectedCat}
            style={{ height: 50, width: 250 }}
            onValueChange={(value) => setSelectedCat(value)}
          >
            <Picker.Item label="Ei tuoteryhm????" />
            {categoriesList}
          </Picker>

          <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setQuantityPerUnit(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          />

          <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
          {/* <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setSupplierId(val)}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            keyboardType="numeric"
            selectTextOnFocus={true}
          /> */}

          <Picker
            prompt="Valitse tavarantoimittaja"
            selectedValue={selectedSupplier}
            style={{ height: 50, width: 250 }}
            onValueChange={(value) => setSelectedSupplier(value)}
          >
            <Picker.Item label="Ei toimittajaa" />
            {suppliersList}
          </Picker>

          <Text style={styles.inputTitle}>Tuote poistunut:</Text>
          <View style={{ flexDirection: "row", marginLeft: 15 }}>
            <Text style={{ marginRight: 4 }}>Ei</Text>
            <Switch
              value={Discontinued}
              onValueChange={(val) => setDiscontinued(val)}
            />
            <Text style={{ marginLeft: 4 }}>Kyll??</Text>
          </View>

          <Text style={styles.inputTitle}>Kuvan linkki:</Text>
          <TextInput
            style={styles.editInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => setImageLink(val)}
            value={ImageLink == null ? "" : ImageLink.toString()}
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            selectTextOnFocus={true}
          />
          {validateUrl(ImageLink) == true ? null : (
            <Text style={styles.validationError}>Tarkista sy??tt??m??si URI</Text>
          )}

          <View style={styles.topSection2}>
            <Pressable onPress={() => createProductOnPress(ProductName)}>
              <View>
                <Ionicons name="save-outline" size={35} color="green" />
                <Text>Lis????</Text>
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

export default TuoteCreate2;
