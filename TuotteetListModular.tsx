import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/styles";
import { Ionicons } from "@expo/vector-icons";
import TuoteDetails from "./TuoteDetails";
import TuoteEdit2 from "./TuoteEdit2";
import TuoteCreate2 from "./TuoteCreate2";
import TuoteDelete from "./TuoteDelete";
import { Picker } from "@react-native-picker/picker";

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

interface INWCategories {
  // Toinen Typescript -interface kategorioita varten
  categoryId: number;
  categoryName: string;
}

export default function TuotteetListModular() {
  const [product, setProduct] = useState<Partial<INWProductsResponse>>({}); // muuttuja joka on tyypiltään tuo yllä luotu interface  https://stackoverflow.com/questions/60109782/react-and-typescript-usestate-on-a-object
  const [productItems, setproductItems] = useState<any>([]);
  const [productItemsCount, setproductItemsCount] = useState(0);

  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productEditModal, setProductEditModal] = useState(false);
  const [productCreateModal, setProductCreateModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);

  const [refreshProducts, setRefreshProducts] = useState(false);
  const [refreshIndicator, setRefreshIndicator] = useState(false);

  const [categories, setCategories] = useState<any>([]);
  const [selectedCat, setSelectedCat] = useState<any>("All");

  useEffect(() => {
    GetCategories();
    GetProducts();
  }, [refreshProducts]); // kun refreshProducts state muuttuu niin useEffect ajetaan, Tämä tapahtuu kun pressablessa kutsutaan refreshJsonData(), joka mm. kääntää refreshproducts arvon päinvastaiseksi

  function GetProducts() {
    let uri = "https://xxxxxxxxxx.azurewebsites.net/api/products/";
    fetch(uri)
      .then((response) => response.json()) // parse the response as JSON
      .then((json: INWProductsResponse[]) => {
        // [] jotta filter method toimisi
        if (selectedCat === "All") {
          setproductItems(json); // Tuotteet hookilla productItems -array muuttujaan
          const fetchCount = Object.keys(json).length; // Object.keys(obj) – returns an array of keys -> .length saadaan määrä ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys & https://javascript.info/keys-values-entries)
          setproductItemsCount(fetchCount); // Tuotteiden määrä hookilla productItemsCount -muuttujaan
        } else {
          const filtered = json.filter(
            (x) => x.categoryId === parseInt(selectedCat)
          ); // Filter metodi + lambda viittaus "categoryId pitää olla selectedCat"
          setproductItems(filtered); // Hakuehdon (kategorian) mukaiset tuotteet hookilla productItems -array muuttujaan
          const fetchCount = Object.keys(filtered).length; // Montako tuotetta filtered-sisällössä
          setproductItemsCount(fetchCount); // Tuotteiden määrä hookilla productItemsCount -muuttujaan
        }
      });
    setRefreshIndicator(false);
  }

  function GetCategories() {
    let uri =
      "https://xxxxxxxxxx.azurewebsites.net/api/categories/getcategories";
    fetch(uri)
      .then((response) => response.json()) // parse the response as JSON
      .then((json: INWCategories) => {
        // json interfacen muotoa
        setCategories(json); // Kategoriat hookilla categories - array muuttujaan
      });
    setRefreshIndicator(false);
  }

  const categoriesList = categories.map((cat: INWCategories, index: any) => {
    return (
      <Picker.Item
        label={cat.categoryName}
        value={cat.categoryId}
        key={index}
      />
    );
  });

  function refreshJsonData() {
    setRefreshProducts(!refreshProducts);
    setRefreshIndicator(true);
  }

  function editProductFunc(item: INWProductsResponse) {
    setProduct(item); // asettaa parametrina saamansa itemin kaikki kentät product-muuttujaan (joka on interfacen mukainen)
    setProductEditModal(true); // Editin näyttö true
  }

  function createProductFunc() {
    setProductCreateModal(true); // Createn näyttö true
  }

  function deleteProductFunc(item: INWProductsResponse) {
    setProduct(item); // asettaa parametrina saamansa itemin kaikki kentät product-muuttujaan (joka on interfacen mukainen)
    setProductDeleteModal(true); // Deleten näyttö true
  }

  function closeDetailsModal() {
    setProductDetailsModal(!productDetailsModal);
  }

  function closeEditModal() {
    setProductEditModal(!productEditModal);
  }

  function closeCreateModal() {
    setProductCreateModal(!productCreateModal);
  }

  function closeDeleteModal() {
    setProductDeleteModal(!productDeleteModal);
  }

  // Pickerin valinta kutsuu tätä ja tämä ottaa parametriksi pickerissä valitun arvon
  function fetchFiltered(value: any) {
    setSelectedCat(value); // asettaa parametrina saavun arvon hookilla selectedCat muuttujaan
    setRefreshProducts(!refreshProducts); // uudelleenlaukaisee useeffectin eli tietojen haut kannasta (virkistää näytön)
  }

  return (
    <View style={[styles.mainWrapper]}>
      <View style={[styles.topSection]}>
        <View>
          <Ionicons name="pricetags-outline" size={24} color="black" />
        </View>
        <Text style={{ fontSize: 18, color: "#000" }}>
          {"Tuotteita yhteensä: " + productItemsCount}
        </Text>

        {/* https://reactnative.dev/docs/pressable */}
        <Pressable
          onPress={() => refreshJsonData()}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#f2f2fc" : "#e6e6fa" },
          ]}
        >
          <View>
            <Ionicons name="sync-outline" size={24} color="black" />
          </View>
        </Pressable>
        {/* prettier-ignore */}
        <ActivityIndicator size="small" color="#0000ff" animating={refreshIndicator}/>
        {/* https://reactnative.dev/docs/activityindicator : ActivityIndicator aktivoituu refreshJsonData() -funktiossa ja se deaktivoidaan GetProducts() -funktiossa */}

        <Pressable onPress={() => createProductFunc()}>
          <View>
            <Ionicons name="add" size={24} color="black" />
          </View>
        </Pressable>
      </View>

      <View style={[styles.pickerSection]}>
        {/* Dropdown valikko (Picker) */}
        <Picker
          prompt="Valitse tuoteryhmä"
          selectedValue={selectedCat}
          style={{ height: 50, width: 250 }}
          onValueChange={(value) => fetchFiltered(value)}
        >
          <Picker.Item label="Hae kaikki tuoteryhmät" value="All" />
          {categoriesList}
        </Picker>
      </View>

      {/* prettier-ignore */}
      <ScrollView>
        {/* Mapataan inventoryItems array, johon haettiin fetchilla sisältö Javascript .map:  https://www.w3schools.com/jsref/jsref_map.asp */}
        {productItems.map((item: INWProductsResponse) => (
          // https://reactnative.dev/docs/pressable
          <Pressable
            key={item.productId}
            onPress={() => {
              setProduct(item); // hookki asettaa itemin product-muuttujaan, joka on siis interface / Modal muuttujassa alla viitataan sitten product.producid jne..
              setProductDetailsModal(true); // hookki vaihtaa productDetailsModal arvoksi true (eli näkymään kuten alempana Modal visiblessä määriteään)
            }}
            style={({ pressed }) => [{backgroundColor: pressed ? "#bcbcf2" : "white",},]}
          >
            <View style={styles.productsContainer}>
              {/*Mikäli item.imageLink on undefined -> näytetään default -kuva, muuten item.imageLink*/}
              <Image source={item.imageLink ? { uri: item.imageLink } : { uri: "https://www.tibs.org.tw/images/default.jpg" }}
                style={[styles.centerSection,{height: 60, width: 60, backgroundColor: "#eeeeee", margin: 6,},]}
              />
              <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: "center" }}>
                <Text style={{ fontSize: 15 }}>{item.productName}</Text>
                <Text style={{ color: "#8f8f8f" }}>
                  {item.category ? "Variation: " + item.category : ""}
                </Text>
                <Text style={{ color: "#333333", marginBottom: 10 }}>
                  {"\u00E1 " +(item.unitPrice == null ? "unitprice is missing " : item.unitPrice.toFixed(2)) + "\u20AC"}
                </Text>
              </View>
              {/* \u00E1 = á & \u20AC = €*/}
              <View style={{ padding:2, marginRight: 10, marginTop: 30}}>
                      <TouchableOpacity style={[{ width: 32, height: 32 }]} onPress={() => editProductFunc(item)} >
                          <Ionicons name="pencil" size={24} color="black" />{/*  editkuvake */}
                      </TouchableOpacity>
                                
                      <TouchableOpacity style={[{ width: 32, height: 32}]} onPress={() => deleteProductFunc(item)}>
                          <Ionicons name="trash-outline" size={24} color="black" />{/* poistokuvake */}
                      </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        ))}
        {/* TuoteDetail modaali-ikkunan / komponentin kutsu jos productDetailsModal === true */}
        { productDetailsModal ? (
                    <Modal
                        style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <TuoteDetails closeModal={closeDetailsModal} passProductId={ product.productId } />

                    </Modal>
                ) : null }        

        {/* Productedit modaali-ikkunan / komponentin kutsu jos producreditModal === true */}
        { productEditModal ? (
                    <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}
                    >
                        <TuoteEdit2 closeModal={closeEditModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId} />
                    </Modal>
                ) : null}

        {/* Productcreate modaali-ikkunan / komponentin kutsu jos productcreateModal === true */}
        { productCreateModal ? (
                    <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}
                    >
                        <TuoteCreate2 closeModal={closeCreateModal} refreshAfterEdit={refreshJsonData} />
                    </Modal>
                ) : null}    

        {/* Productdelete modaali-ikkunan / komponentin kutsu jos productdeleteModal === true */}
        { productDeleteModal ? (
                    <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}
                    >
                        <TuoteDelete closeModal={closeDeleteModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId} />
                    </Modal>
                ) : null}

      </ScrollView>
    </View>
  );
}
