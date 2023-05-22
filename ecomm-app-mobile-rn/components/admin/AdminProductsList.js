import { Text, SafeAreaView, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { fetchAllProducts } from "../../services/products.http";
import { styles } from "../../styles/styles";
import { AdminProduct } from "./AdminProduct";
import Header from "../Header.ios";
import { useNavigation } from "@react-navigation/native";
import { AdminContext } from "../../common/admin.context";

export const AdminProductsList = (props) => {
  const navigation = useNavigation();
  const { reloadProducts } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [refreshProducts, setRefreshProducts] = useState(false);
  useEffect(() => {
    console.log("AdminProductsList");
    fetchAllProducts()
      .then((res) => {
        console.log("AdminProductsList products: ", res.data);
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((error) => {
        console.log("AdminProductsList err: ", error);
      });
  }, [refreshProducts, reloadProducts]);

  const onProductSaved = () => {
    setRefreshProducts(!refreshProducts);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title2}>All Products</Text>
      <TouchableHighlight
        style={[styles.content, styles.button, { alignSelf: "stretch" }]}
        onPress={() => {
          navigation.navigate("AddEditProduct", {
            product: null,
            onProductSaved,
          });
        }}
      >
        <Text style={styles.submitButtonText}>Add Product</Text>
      </TouchableHighlight>
      <TextInput
        placeholder="search"
        onChangeText={(text) => {
          setSearchKey(text);
          setFilteredProducts(
            products.filter((prod) =>
              prod.name.toLowerCase().includes(searchKey.toLowerCase())
            )
          );
          if (text == "") {
            setFilteredProducts(products);
          }
        }}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <AdminProduct product={item} onProductSaved={onProductSaved} />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};
