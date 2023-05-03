import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CheckBox, Icon } from "@rneui/themed";
import { useEffect, useState } from "react";

const TripButton = ({ trip, navigation }) => {
  // const [checked, setChecked] = useState(false);
  // const handleCheck = () => setChecked(!checked);

  const getDate = (date) => {
    dateObject = date.toDate();
    options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return dateObject.toLocaleDateString(undefined, options);
  };

  const numOfPeople = trip.attending.length;
  const firstPerson = trip.attending.length > 0 ? trip.attending[0].name : null;

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
          // checked: checked,
        })
      }
    >
      <View style={styles.buttonTop}>
        <Text style={styles.tripTitle}>{trip.title}</Text>
        {trip.dates[0] !== "-" && (
          <View style={styles.datesContainer}>
            <Text style={styles.dateText}>{getDate(trip.dates[0])}</Text>
            {trip.dates[1] !== "-" && (
              <Text style={styles.dateText}>- {getDate(trip.dates[1])}</Text>
            )}
          </View>
        )}
      </View>
      <Text style={styles.locationText}>{trip.location}</Text>

      <View style={styles.tripContainerBottom}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.attendingIcons}>
            {trip.attending.length > 0 && (
              <View style={[styles.profileContainer, { zIndex: 1 }]}>
                <Text style={styles.initials}>
                  {trip.attending[0].initials}
                </Text>
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
          <Text style={{ marginLeft: 10, width: 70 }}>
            {firstPerson}{" "}
            {numOfPeople === 2 && "and " + `${numOfPeople - 1}` + " other"}
            {numOfPeople > 2 && "and " + `${numOfPeople - 1}` + " others"}
          </Text>
        </View>
        {/* <CheckBox
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
        /> */}
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
    flex: 2,
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
      height: 1,
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
  buttonTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datesContainer: {
    display: "flex",
    flex: 1,
  },
  dateText: {
    color: "gray",
    textAlign: "right",
  },
});

export default TripButton;
