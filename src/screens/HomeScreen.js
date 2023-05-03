import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import Drawer from "react-native-drawer";
import { collection, query, onSnapshot, setDoc, doc } from "firebase/firestore";
import { db } from "../../util/firebase";
import TripButton from "../components/TripButton";
import DrawerContent from "../components/DrawerContent";
import { auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  // useState
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const addUser = async () => {
    if (!user) return;

    const userInfo = {
      name: user.displayName,
      attending: [],
      notAttending: [],
    };

    await setDoc(doc(db, "users", user.uid), userInfo);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        console.log(user);
        setUser(user);
        addUser();
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  // handle clicks
  const handleAddClick = () => {
    setOpen(true);
  };

  const handleTapClose = () => {
    setOpen(false);
  };

  // query trips
  useEffect(() => {
    const q = query(collection(db, "trips"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.docs.map((x) => {
        const obj = {
          title: x.get("title"),
          location: x.get("location"),
          dates: x.get("dates"),
          attending: x.get("attending"),
        };
        const newObj = { ...obj, id: x.id };
        temp.push(newObj);
      });
      setTrips(temp);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Drawer
          side="bottom"
          type="overlay"
          tapToClose
          open={open}
          content={
            <DrawerContent handleTapClose={handleTapClose} setOpen={setOpen} />
          }
          openDrawerOffset={0.05}
          onCloseStart={handleTapClose}
        >
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Home</Text>

            {!signedIn ? (
              <Button
                buttonStyle={{ borderRadius: 50, backgroundColor: "#00796b" }}
                containerStyle={{ borderRadius: 50 }}
                raised
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    color: "white",
                  }}
                >
                  Sign in
                </Text>
              </Button>
            ) : (
              <Button
                onPress={() => {
                  navigation.navigate("Profile", { user: user });
                }}
                buttonStyle={styles.profileContainer}
                containerStyle={styles.profileContainer}
              >
                <Text style={styles.initials}>MM</Text>
              </Button>
            )}
          </View>

          <ScrollView style={styles.whiteContainer}>
            <Text style={styles.subheading}>Trips</Text>
            <Text
              style={{
                color: "#979C9E",
                fontWeight: "bold",
                fontSize: 14,
                fontStyle: "italic",
                marginTop: 10,
                textAlign: "right",
              }}
            >
              Click on trip to RSVP
            </Text>

            {/* trips from database */}
            {trips.map((trip) => (
              <TripButton trip={trip} navigation={navigation} key={trip.id} />
            ))}
          </ScrollView>
          <Button
            type="solid"
            color="#26a69a"
            buttonStyle={styles.addButton}
            containerStyle={styles.buttonContainer}
            onPress={handleAddClick}
            raised
          >
            <Icon name="plus" type="feather" color="white" />
          </Button>
        </Drawer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#26a69a",
    flex: 1,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 25,
    marginTop: 70,
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#00796b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  initials: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 25,
  },
  whiteContainer: {
    backgroundColor: "#fff",
    height: "100%",
    marginTop: "8%",
    borderRadius: 20,
    padding: 35,
  },
  subheading: {
    color: "#979C9E",
    fontWeight: "bold",
    fontSize: 24,
  },
  addButton: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    right: 30,
    borderRadius: 50,
  },
  drawerStyles: {
    main: { border: "solid" },
  },
  calendar: {
    marginTop: 20,
    width: 350,
  },
});

export default HomeScreen;
