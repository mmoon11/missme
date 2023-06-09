import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { auth } from "../../util/firebase";
import { updateProfile } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmail(user.email);
        setDisplayName(user.displayName);
      }
    });
  }, []);

  const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  const updateUserInfo = () => {
    updateProfile(user, {
      email: email,
      displayName: displayName,
    }).then(() => {
      console.log("success!!!");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, textAlign: "center", marginBottom: 50 }}>
        Profile
      </Text>
      {email !== null && (
        <Text style={{ fontSize: 14, color: "gray" }}>Email</Text>
      )}
      <TextInput
        placeholder="Email"
        defaultValue={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.textInput}
      />

      <Text style={{ fontSize: 14, color: "gray" }}>Name</Text>
      <TextInput
        placeholder="Enter your name"
        defaultValue={displayName}
        onChangeText={(name) => setDisplayName(name)}
        style={styles.textInput}
      />

      <Button
        title="Save"
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
        onPress={updateUserInfo}
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
    marginTop: 10,
    padding: 15,
    marginBottom: 20,
  },
});

export default ProfileScreen;
