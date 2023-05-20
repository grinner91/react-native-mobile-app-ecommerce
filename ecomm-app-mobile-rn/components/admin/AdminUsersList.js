import { Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { AdminProduct } from "./AdminProduct.js";
import { fetchAllProducts } from "../../services/products.http.js";
import { styles } from "../../styles/styles.js";

export const AdminUsersList = (props) => {
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
      <View>{/* <Text>Products</Text> */}</View>
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
