import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { Button } from "@rneui/themed";
import auth from "@react-native-firebase/auth";

const SignUpScreen = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (signupEmail !== "" && signupPassword !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [signupEmail, signupPassword]);

  const onSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("User account created & signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

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
        secureTextEntry
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
        disabled={disabled}
        onPress={onSignUp}
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

export default SignUpScreen;
