import {
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { CustomerOrder } from "./CustomerOrder";
import { styles } from "../../styles/styles";
import Header from "../Header.ios";
import { fetchAllOrdersByUser } from "../../services/orders.http";
import { AppContext } from "../../common/app.context";

export const CustomerOrdersList = (props) => {
  const { state, reload } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [refreshOrders, setRefreshOrders] = useState(false);

  useEffect(() => {
    console.log("CustomerOrdersList state: ", state);
    fetchOrdersList();
  }, [reload, refreshOrders]);

  const fetchOrdersList = async () => {
    if (state.user && state.user._id) {
      fetchAllOrdersByUser(state.user._id)
        .then((res) => {
          //console.log("CustomerOrdersList Orders: ", res.data);
          const list = res.data;
          list.sort((a, b) => new Date(b.time) - new Date(a.time));
          setOrders(list);
          setFilteredOrders(list);
        })
        .catch((error) => {
          console.log("CustomerOrdersList err: ", error);
        });
    } else {
      Alert.alert("Please, login to see orders list.");
      console.log("CustomerOrdersList usr: ", state);
      setFilteredOrders([]);
      setOrders([]);
    }
  };
  const onOrderUpdated = () => {
    setRefreshOrders(!refreshOrders);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title2}>My Orders </Text>
      <View style={{ flexDirection: "row", padding: 5 }}>
        <TouchableHighlight
          style={[styles.button, styles.sorticon]}
          onPress={() => setRefreshOrders(!refreshOrders)}
        >
          <MaterialCommunityIcons name="reload" size={20} />
        </TouchableHighlight>
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
          style={[styles.searchInput, { width: 280 }]}
        />
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => (
          <CustomerOrder order={item} onOrderUpdated={onOrderUpdated} />
        )}
        keyExtractor={(item) => item._id}
      />
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
