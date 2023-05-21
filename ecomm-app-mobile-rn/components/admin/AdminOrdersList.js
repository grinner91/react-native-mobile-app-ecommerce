import { Text, SafeAreaView, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { fetchAllOrders } from "../../services/orders.http";
import { AppContext } from "../../common/app.context";
import { styles } from "../../styles/styles";
import { AdminOrder } from "./AdminOrder";

export const AdminOrdersList = (props) => {
  const { state, reload } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [refreshOrders, setRefreshOrders] = useState(false);

  useEffect(() => {
    console.log("AdminOrdersList state: ", state);
    fetchOrdersList();
  }, [reload, refreshOrders]);

  const fetchOrdersList = async () => {
    if (state.user) {
      fetchAllOrders()
        .then((res) => {
          console.log("AdminOrdersList Orders: ", res.data);
          setOrders(res.data);
          setFilteredOrders(res.data);
        })
        .catch((error) => {
          console.log("AdminOrdersList err: ", error);
        });
    } else {
      Alert.alert("Please, login to see orders list.");
      console.log("AdminOrdersList usr: ", state);
      setFilteredOrders([]);
      setOrders([]);
    }
  };
  const onOrderUpdated = () => {
    setRefreshOrders(!refreshOrders);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title2}>All Orders </Text>
      <TextInput
        placeholder="search"
        autoCapitalize="none"
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
        data={filteredOrders}
        renderItem={({ item }) => (
          <AdminOrder order={item} onOrderUpdated={onOrderUpdated} />
        )}
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
