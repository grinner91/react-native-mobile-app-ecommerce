import { Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { fetchAllProducts } from "../services/products.http";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Product } from "./Product";
import Header from "./Header.ios";

export const ProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        //console.log("ProductsList products: ", res.data);
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((error) => {
        console.log("err: ", error);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
        renderItem={({ item }) => <Product product={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};
