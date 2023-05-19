import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
  },
  list: {
    borderColor: "#00bfff",
    borderWidth: 0,
    alignSelf: "stretch",
    width: 300,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00bfff",
    borderColor: "#00bfff",
    borderRadius: 0,
    padding: 5,
    height: 30,
    margin: 5,
  },

  input: {
    borderColor: "#00bfff",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "stretch",
  },
  searchInput: {
    borderColor: "#00bfff",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    width: 350,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#fff8dc",
    width: 300,
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    //backgroundColor: "#fff8dc",
    alignSelf: "stretch",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#f0ffff",
    borderColor: "#00bfff",
    borderWidth: 1,
    margin: 2,
    alignSelf: "stretch",
    flex: 1,
    width: 350,
  },
  imagePreview: {
    height: 40,
    width: 40,
    borderColor: "#00bfff",
    borderWidth: 2,
    marginBottom: 2,
  },
  quantity: {
    borderColor: "#00bfff",
    backgroundColor: "#f0ffff",
    borderWidth: 1,
  },
});
