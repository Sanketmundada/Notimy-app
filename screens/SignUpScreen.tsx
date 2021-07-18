import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-elements";
import axios from "axios";
import { BASE_URL } from "../constants";
import { registerForPushNotificationsAsync } from "../utils/registerExpoToken";
import { NavProps } from "../routes/types";

const SignUp: React.FC<NavProps<"Signup">> = ({ navigation }) => {
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

  const [expoToken, setExpoToken] = useState("");

  useEffect(() => {
    // generate expoToken
    (async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoToken(token);
    })();
  }, []);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        email,
        password,
        expoToken,
      });
      console.log(res);
      setState({
        email: "",
        password: "",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  console.log(email, password);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.text}>
        SignUp
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
      <Button title="Register" loading={loading} onPress={handleSubmit} />

      <Text
        onPress={() => {
          navigation.navigate("Login");
        }}
        style={{ paddingVertical: 10 }}
      >
        Go to Login
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

export default SignUp;
