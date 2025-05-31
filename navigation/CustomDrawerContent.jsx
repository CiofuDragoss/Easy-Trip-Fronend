import { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CustomDrawerContent(props) {
  const { logOut, username } = useContext(AuthContext);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.ball}>
          <MaterialIcons name="account-circle" size={40} color="black" />
        </View>
        <Text style={styles.logout}>{username}</Text>
      </View>
      <View style={{ backgroundColor: "rgba(255, 0, 0, 0.1)", width: "100%" }}>
        <DrawerItemList {...props} />
        <DrawerItem style={styles.logout} onPress={logOut} label="Log Out" />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  ball: {
    margin: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  logout: {
    color: "red",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  header: {
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
  },
});
