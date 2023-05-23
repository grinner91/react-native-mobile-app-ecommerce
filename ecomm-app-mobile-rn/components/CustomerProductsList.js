import {
  Text,
  SafeAreaView,
  View,
  TouchableHighlight,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { fetchAllProducts } from "../services/products.http";
//import { FlatList, TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { CustomerProduct } from "./CustomerProduct.js";
import Header from "./Header.ios";

export const CustomerProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [ascSort, setAscSort] = useState(false);
  const [reloadProducts, setReloadProducts] = useState(false);
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
  }, [reloadProducts]);
  const onSort = (asc) => {
    //console.log("asc sort: ", asc);
    let list = [...filteredProducts];
    if (asc) {
      list = list.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        else if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        else return 0;
      });
    } else {
      list = list.sort((a, b) => {
        if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        else return 0;
      });
    }
    setFilteredProducts(list);
    setAscSort(asc);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flexDirection: "row", padding: 5 }}>
        <TouchableHighlight
          style={[styles.button, styles.sorticon]}
          onPress={() => setReloadProducts(!reloadProducts)}
        >
          <MaterialCommunityIcons name="reload" size={20} />
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.sorticon]}
          onPress={() => onSort(!ascSort)}
        >
          <MaterialCommunityIcons name="sort" size={20} />
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
          style={[styles.searchInput, styles.content2, { width: 260 }]}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <CustomerProduct product={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};
