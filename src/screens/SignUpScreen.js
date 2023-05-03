import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { Button } from "@rneui/themed";

const LoginScreen = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 50 }}>
        Sign up
      </Text>
      <TextInput
        placeholder="Enter your email"
        defaultValue={signupEmail}
        onChangeText={(email) => setSignupEmail(email)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Enter a password"
        defaultValue={signupPassword}
        onChangeText={(password) => setSignupPassword(password)}
        style={styles.textInput}
      />
      <Button
        title="Sign up"
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
