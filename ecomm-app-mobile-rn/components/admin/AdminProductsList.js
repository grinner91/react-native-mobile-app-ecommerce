import { Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { AdminProduct } from "./AdminProduct";
import { fetchAllProducts } from "../../services/products.http";
import { styles } from "../../styles/styles";

export const AdminProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        //console.log("ProductsList products: ", data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.log("err: ", error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        style={[styles.button]}
        onPress={() => {
          navigation.navigate("AddEditProduct", { product: null });
        }}
      >
        <Text style={styles.submitButtonText}>Products</Text>
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
        renderItem={({ item }) => <AdminProduct product={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};
