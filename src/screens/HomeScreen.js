import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, Icon, Button } from "@rneui/themed";
import { TextInput } from "react-native";
import { useState, useCallback } from "react";
import Drawer from "react-native-drawer";
// import { Calendar } from "react-native-calendars";
import { DatePickerModal } from "react-native-paper-dates";

const HomeScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => setChecked(!checked);
  const [open, setOpen] = useState(true);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleTapClose = () => {
    setOpen(false);
  };

  const DrawerContent = () => {
    const [tripName, setTripName] = useState("");
    const [location, setLocation] = useState("");
    const [range, setRange] = useState(["-", "-"]);
    const [calOpen, setCalOpen] = useState(false);

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
        {/* <Calendar
          style={styles.calendar}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
        /> */}

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
            onPress={handleAddClick}
          >
            <Text style={styles.whiteText}>Add Trip</Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Drawer
          side="bottom"
          type="overlay"
          tapToClose
          open={open}
          content={<DrawerContent />}
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
            {/* generate trips from database */}
            {/* dummy data */}
            <TouchableOpacity style={styles.tripContainer} activeOpacity={0.5}>
              <Text style={styles.tripTitle}>Miss me summer trip 2023</Text>
              <View style={styles.tripContainerBottom}>
                <View style={styles.profileContainer}>
                  {/* replace with initials */}
                  <Text style={styles.initials}>MM</Text>
                </View>
                <CheckBox
                  right
                  title={"Going?"}
                  iconRight
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={handleCheck}
                  checked={checked}
                  size={24}
                  checkedIcon={
                    <Icon name="check-circle" type="feather" color="green" />
                  }
                  uncheckedIcon={<Icon name="circle" type="feather" />}
                />
              </View>
            </TouchableOpacity>

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
  tripContainer: {
    backgroundColor: "#F2F4F5",
    borderRadius: 7,
    padding: 20,
    marginTop: 20,
    shadowColor: "#171717",
    shadowOffset: { height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  tripTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  tripContainerBottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  checkboxContainer: {
    backgroundColor: "#F2F4F5",
    padding: 0,
  },
  checkboxText: {
    fontWeight: "normal",
    color: "#000",
    fontSize: 16,
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
  drawerContent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  calendar: {
    marginTop: 20,
    width: 350,
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
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginTop: 60,
    position: "absolute",
    bottom: 60,
  },
  whiteText: {
    color: "#fff",
  },
  datesButton: {
    backgroundColor: "#26a69a",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  dates: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
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
  datesButtonContainer: {
    shadowColor: "#171717",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default HomeScreen;
