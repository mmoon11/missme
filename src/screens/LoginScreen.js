import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { Button } from "@rneui/themed";

const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 50 }}>
        Sign in
      </Text>
      <TextInput
        placeholder="Email"
        defaultValue={loginEmail}
        onChangeText={(email) => setLoginEmail(email)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        defaultValue={loginPassword}
        onChangeText={(password) => setLoginPassword(password)}
        style={styles.textInput}
      />
      <Button
        title="Sign in"
        type="solid"
        color="#26a69a"
        radius="xs"
        raised
        buttonStyle={{
          backgroundColor: "#26a69a",
          height: 45,
          borderRadius: 50,
        }}
        containerStyle={{ borderRadius: 50, marginTop: 30 }}
      />
      <Text style={{ textAlign: "center", marginTop: 15 }} onPress={{}}>
        Sign up here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 30,
    paddingTop: 55,
  },
  textInput: {
    fontSize: 16,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgray",
    marginTop: 20,
    padding: 15,
  },
});

export default LoginScreen;
