import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, Icon } from "@rneui/themed";
import { useState } from "react";

const TripButton = ({ trip, navigation }) => {
  const handleCheck = () => setChecked(!checked);

  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      style={styles.tripContainer}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("Trip", {
          tripName: trip.title,
          location: trip.location,
          range: trip.dates,
          attending: trip.attending,
          checked: checked,
        })
      }
    >
      <Text style={styles.tripTitle}>{trip.title}</Text>
      <Text style={styles.locationText}>{trip.location}</Text>

      <View style={styles.tripContainerBottom}>
        <View style={styles.attendingIcons}>
          {trip.attending.length > 0 && (
            <View style={[styles.profileContainer, { zIndex: 1 }]}>
              <Text style={styles.initials}>{trip.attending[0].initials}</Text>
            </View>
          )}
          {trip.attending.slice(1).map((person) => (
            <View
              style={[styles.profileContainer, { marginLeft: -20 }]}
              key={person}
            >
              <Text style={styles.initials}>{person.initials}</Text>
            </View>
          ))}
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
  );
};

const styles = StyleSheet.create({
  tripContainer: {
    backgroundColor: "#F2F4F5",
    borderRadius: 7,
    padding: 20,
    marginTop: 20,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
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
  attendingIcons: {
    display: "flex",
    flexDirection: "row",
  },
  profileContainer: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#00796b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    shadowColor: "black",
    shadowOffset: {
      heigth: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  initials: {
    fontWeight: "bold",
    color: "#fff",
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
  locationText: {
    fontSize: 18,
    fontWeight: 600,
    color: "gray",
    marginTop: 2,
  },
});

export default TripButton;
