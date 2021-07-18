import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BASE_URL } from "../constants";
import { NavProps } from "../routes/types";
const LoginScreen: React.FC<NavProps<"Login">> = ({ navigation }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const handleChange = (e, name) => {
    console.log(e);
    setState((prev) => {
      return {
        ...prev,
        [name]: e,
      };
    });
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem("token", res.data.token);
      setState({
        email: "",
        password: "",
      });
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  console.log(email, password);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.text}>
        Login
      </Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="email" size={24} color="black" />}
        label="Enter your email id"
        onChangeText={(e) => handleChange(e, "email")}
      />
      <Input
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={24} color="black" />}
        label="Enter your password"
        onChangeText={(e) => handleChange(e, "password")}
      />
      <Button title="Login" loading={loading} onPress={handleSubmit} />
      <Text
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={{ paddingVertical: 10 }}
      >
        Go to Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    marginVertical: 80,
  },
});

export default LoginScreen;
