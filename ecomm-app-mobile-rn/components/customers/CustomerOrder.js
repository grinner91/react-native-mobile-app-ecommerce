import { Text, View, Image, FlatList, TouchableHighlight } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { CustomerOrderProductItem } from "./CustomerOrderProductItem";
import { updateOrderRequest } from "../../services/orders.http";
import { ORDER_STATUS } from "../../common/constants";

export const CustomerOrder = ({ order, onOrderUpdated }) => {
  useEffect(() => {
    //
  }, []);

  const updateOrderStatusPress = (orderStatus) => {
    updateOrderRequest(order._id, orderStatus)
      .then((res) => {
        console.log("updateOrderStatusPress res: ", res);
        onOrderUpdated();
      })
      .catch((err) => console.log("updateOrderStatusPress err: ", err));
  };

  const orderStatusActionsUI = () => {
    if (order.status == ORDER_STATUS.CANCELED) {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            updateOrderStatusPress(ORDER_STATUS.ORDERED);
          }}
        >
          <Text style={styles.buttonText}>Order again</Text>
        </TouchableHighlight>
      );
    } else if (order.status == ORDER_STATUS.ORDERED) {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            updateOrderStatusPress(ORDER_STATUS.CANCELED);
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>
      );
    } else if (order.status == ORDER_STATUS.DELIVERED) {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            updateOrderStatusPress(ORDER_STATUS.RETURNED);
          }}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableHighlight>
      );
    } else {
      return <Text>{order.status}</Text>;
    }
  };

  return (
    <View style={[styles.content]}>
      <View style={{ flexDirection: "column" }}>
        <Text styles={styles.title3}>
          {"Placed on " + new Date(order.time).toLocaleDateString()}
        </Text>
        <Text> {"Total $" + order.total}</Text>
        <Text> {"Status: " + order.status}</Text>
      </View>

      <View
        style={[
          styles.content2,
          { flexDirection: "column", alignItems: "center" },
        ]}
      >
        {order && order.products ? (
          <FlatList
            data={order.products}
            renderItem={({ item }) => (
              <CustomerOrderProductItem product={item} />
            )}
            keyExtractor={(item) => item._id}
          />
        ) : (
          ""
        )}
      </View>
      {orderStatusActionsUI()}
    </View>
  );
};
