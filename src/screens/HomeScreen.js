import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Icon, Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import Drawer from "react-native-drawer";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../util/firebase";
import TripButton from "../components/TripButton";
import DrawerContent from "../components/DrawerContent";

const HomeScreen = ({ navigation, route }) => {
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
          content={
            <DrawerContent handleTapClose={handleTapClose} setOpen={setOpen} />
          }
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

          <ScrollView style={styles.whiteContainer}>
            <Text style={styles.subheading}>Trips</Text>

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
