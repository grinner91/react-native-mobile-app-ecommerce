import { Text, View, Image, FlatList, TouchableHighlight } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { ORDER_STATUS } from "../../common/constants";
import { AdminOrderProductItem } from "./AdminOrderProductItem";
import { styles } from "../../styles/styles";
import { updateOrderRequest } from "../../services/orders.http";

export const AdminOrder = ({ order, onOrderUpdated }) => {
  console.log("AdminOrder order: ", order);
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
    if (order.status == ORDER_STATUS.ORDERED) {
      return (
        <>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              updateOrderStatusPress(ORDER_STATUS.CANCELED);
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              updateOrderStatusPress(ORDER_STATUS.DELIVERED);
            }}
          >
            <Text style={styles.buttonText}>Delivered</Text>
          </TouchableHighlight>
        </>
      );
    } else if (order.status === ORDER_STATUS.DELIVERED) {
      return (
        <>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              updateOrderStatusPress(ORDER_STATUS.ORDERED);
            }}
          >
            <Text style={styles.buttonText}>Not Delivered</Text>
          </TouchableHighlight>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <View style={[styles.content]}>
      <View style={{ flexDirection: "column" }}>
        <Text>
          {" "}
          {" Placed on " + new Date(order.time).toLocaleDateString()}
        </Text>
        <Text> {" Total $" + order.total}</Text>
        <Text> {" status: " + order.status}</Text>
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
            renderItem={({ item }) => <AdminOrderProductItem product={item} />}
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
