import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { NavProps } from "../routes/types";

const InitScreen: React.FC<NavProps<"Init">> = ({ navigation }) => {
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) navigation.navigate("Main");
      else navigation.navigate("Signup");
    })();
  }, []);
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default InitScreen;
