import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { fetchAllProducts } from "../../services/products.http";
import { styles } from "../../styles/styles";
import { AdminProduct } from "./AdminProduct";
import { useNavigation } from "@react-navigation/native";
import { AdminContext } from "../../common/admin.context";

export const AdminProductsList = (props) => {
  const navigation = useNavigation();
  const { reloadProducts } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  //const [refreshProducts, setRefreshProducts] = useState(false);
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
  }, [reloadProducts]);

  const onProductSaved = () => {
    setRefreshProducts(!refreshProducts);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title2}>All Products</Text>
      <View style={{ marginLeft: 10 }}>
        <TouchableHighlight
          style={[
            styles.content2,
            styles.button,
            styles.adminColor,
            { alignSelf: "stretch" },
          ]}
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
          style={[styles.content2, styles.searchInput, styles.adminColor]}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <AdminProduct product={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};
