import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { Button } from "@rneui/themed";
import { auth } from "../../util/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const onSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
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

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      navigation.navigate("Home");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 50 }}>
        Sign in
      </Text>
      <TextInput
        placeholder="Email"
        defaultValue={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        defaultValue={password}
        onChangeText={(password) => setPassword(password)}
        style={styles.textInput}
        secureTextEntry
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
        disabled={disabled}
        onPress={onLogin}
      />

      <Button
        title="Sign up"
        type="solid"
        color="#26a69a"
        radius="xs"
        buttonStyle={{
          backgroundColor: "white",
          height: 45,
          borderRadius: 50,
        }}
        containerStyle={{ borderRadius: 50, marginTop: 15 }}
        disabled={disabled}
        onPress={onSignUp}
        titleStyle={{ color: "black" }}
      />
      {/* <Text
        style={{ textAlign: "center", marginTop: 15 }}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        Sign up here
      </Text> */}
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
