import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { Icon, Button } from "@rneui/themed";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../util/firebase";

const DrawerContent = ({ handleTapClose, setOpen }) => {
  // useState
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [range, setRange] = useState(["-", "-"]);
  const [calOpen, setCalOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (tripName.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [tripName]);

  // handle clicks
  const onDismiss = useCallback(() => {
    setCalOpen(false);
  }, [setCalOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setCalOpen(false);
      if (startDate && endDate) {
        endDate.setDate(endDate.getDate() - 1);
        setRange([
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
        ]);
      }
    },
    [setCalOpen, setRange]
  );

  const openDates = () => {
    setCalOpen(true);
  };

  // add trip
  const addTrip = async () => {
    if (tripName === "") return;

    const trip = {
      title: tripName,
      location: location,
      dates: range,
      attending: [],
    };

    const tripsCollectionRef = collection(db, "trips");
    await addDoc(tripsCollectionRef, trip);
    setOpen(false);
  };

  return (
    <View style={styles.drawerContent}>
      <Text>Create new trip</Text>
      <TextInput
        placeholder="Trip name"
        defaultValue={tripName}
        onChangeText={(title) => setTripName(title)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Location"
        defaultValue={location}
        onChangeText={(location) => setLocation(location)}
        style={[styles.textInput, { marginTop: 40 }]}
      />

      <DatePickerModal
        locale="en"
        mode="range"
        visible={calOpen}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />

      <View style={styles.dates}>
        <Button
          type="solid"
          color="#26a69a"
          radius="xs"
          buttonStyle={styles.datesButton}
          containerStyle={styles.datesButtonContainer}
          onPress={openDates}
          raised
        >
          <Icon name="calendar" type="feather" color="white" />
        </Button>

        <Text style={styles.dateText}>{range[0]}</Text>
        <Text style={styles.dateText}>{range[1]}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          type="solid"
          color="#26a69a"
          radius="xs"
          buttonStyle={styles.cancelButton}
          onPress={handleTapClose}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          type="solid"
          color="#26a69a"
          radius="xs"
          buttonStyle={styles.addTripButton}
          containerStyle={{ borderRadius: 50 }}
          onPress={addTrip}
          disabled={disabled}
          disabledStyle={{ backgroundColor: "lightgray" }}
          raised
        >
          <Text style={disabled ? null : styles.whiteText}>Add Trip</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
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
  dates: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  datesButton: {
    backgroundColor: "#26a69a",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  dateText: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 8,
    minWidth: 125,
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginTop: 60,
    position: "absolute",
    bottom: 60,
  },
  cancelButton: {
    backgroundColor: "lightgray",
    borderRadius: 50,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  addTripButton: {
    backgroundColor: "#26a69a",
    borderRadius: 50,
    height: 50,
    paddingLeft: 90,
    paddingRight: 90,
  },
  whiteText: {
    color: "#fff",
  },
  datesButtonContainer: {
    borderRadius: 50,
  },
});

export default DrawerContent;
