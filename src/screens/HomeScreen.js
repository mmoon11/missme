import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, Icon, Button, Input } from "@rneui/themed";
import { useState } from "react";
import Drawer from "react-native-drawer";
import { Typography } from "@mui/material";
import { style } from "@mui/system";

const HomeScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => setChecked(!checked);
  const [open, setOpen] = useState(true);
  const [tripName, setTripName] = useState("");

  const handleAddClick = () => {
    setOpen(!open);
  };

  const DrawerContent = () => {
    return (
      <View style={styles.drawerContent}>
        <Text>Create new trip</Text>
        <Input
          placeholder="Trip name"
          onChangeText={setTripName()}
          value={tripName}
        />
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
          openDrawerOffset={0.3}
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
              radius="xs"
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
  },
  drawerStyles: {
    main: { border: "solid" },
  },
  drawerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#171717",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default HomeScreen;
