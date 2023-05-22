import { Text, SafeAreaView, View, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

import { styles } from "../../styles/styles.js";
import { AdminUserItem } from "./AdminUserItem.js";
import { fetchAllUsers } from "../../services/users.http.js";

export const AdminUsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [refreshUsers, setRefreshUsers] = useState(false);
  useEffect(() => {
    fetchAllUsers()
      .then((res) => {
        //console.log("AdminUsersList users: ", res);
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((error) => {
        console.log("AdminUsersList err: ", error);
      });
  }, [refreshUsers]);

  const onUserStatusUpdated = () => {
    setRefreshUsers(!refreshUsers);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Users</Text>
      </View>
      <TextInput
        placeholder="search"
        autoCapitalize="none"
        onChangeText={(text) => {
          setSearchKey(text);
          setFilteredUsers(
            users.filter((user) =>
              user.fullname.toLowerCase().includes(searchKey.toLowerCase())
            )
          );
          if (text == "") {
            setFilteredUsers(users);
          }
        }}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => (
          <AdminUserItem
            user={item}
            onUserStatusUpdated={onUserStatusUpdated}
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};
