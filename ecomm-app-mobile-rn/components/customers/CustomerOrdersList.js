import { Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import { fetchAllProducts } from "../services/products.http";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { CustomerProduct } from "./CustomerProduct.js";
import Header from "./Header.ios";

export const CustomerOrdersList = (props) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        console.log("OrdersList Orders: ", res.data);
        setOrders(res.data);
        setFilteredOrders(res.data);
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
          setFilteredOrders(
            orders.filter((ord) => {
              const list = ord.products.filter((prod) =>
                prod.name.toLowerCase().includes(searchKey.toLowerCase())
              );
              return list && list.length > 0;
            })
          );
          if (text == "") {
            setFilteredOrders(orders);
          }
        }}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <CustomerOrder product={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};

/*

{
    "success": true,
    "data": [
        {
            "_id": "64692b2797e319546cfd2072",
            "userId": "6466efdc68335b913881b19f",
            "products": [
                {
                    "name": "iPhone 12",
                    "price": 99,
                    "quantity": 3,
                    "_id": "6466d772434af5bc980a0645"
                }
            ],
            "total": 297,
            "payment": "card",
            "status": "ordered",
            "time": "2023-05-20T20:18:47.254Z",
            "__v": 0
        }
    ]
}*/
