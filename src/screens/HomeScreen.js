import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, Icon, Button } from "@rneui/themed";
import { useState, useCallback, useEffect } from "react";
import Drawer from "react-native-drawer";
import {
  collection,
  query,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../../util/firebase";
import TripButton from "../components/TripButton";
import DrawerContent from "../components/DrawerContent";

const HomeScreen = ({ navigation }) => {
  // useState
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);

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
          content={<DrawerContent handleTapClose={handleTapClose} />}
          openDrawerOffset={0.05}
          onCloseStart={handleTapClose}
        >
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Home</Text>

            <View style={styles.profileContainer}>
              {/* replace with initials */}
              <Text style={styles.initials}>MM</Text>
            </View>
          </View>
          <View style={styles.whiteContainer}>
            <Text style={styles.subheading}>Trips</Text>

            {/* trips from database */}
            {trips.map((trip) => (
              <TripButton trip={trip} navigation={navigation} key={trip.id} />
            ))}

            <Button
              type="solid"
              color="#26a69a"
              buttonStyle={styles.addButton}
              containerStyle={styles.buttonContainer}
              onPress={handleAddClick}
            >
              <Icon name="plus" type="feather" color="white" />
            </Button>
          </View>
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
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#00796b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  initials: {
    fontWeight: "bold",
    color: "#fff",
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
    borderRadius: 50,
    width: 65,
    height: 65,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 190,
    right: 35,
    shadowColor: "#171717",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
