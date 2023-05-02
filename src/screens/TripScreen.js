import { StyleSheet, Text, View } from "react-native";
import { Chip } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";

const TripScreen = ({ route, navigation }) => {
  const { tripName, location, range, attending } = route.params;
  console.log(location);

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>{tripName}</Text>
      </View>
      {/* <View style={styles.chipContainer}>
        <Chip title={"Overview"} containerStyle={{ width: 100 }} />
        <Chip title={"Availability"} containerStyle={{ width: 100 }} />
      </View> */}
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>Dates</Text>
        {range[0] === "-" ? (
          <Text style={styles.information}>TBD</Text>
        ) : (
          <Text style={styles.information}>
            {range[0].toDate().toLocaleString()} -{" "}
            {range[1].toDate().toLocaleString()}
          </Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>Location</Text>
        {location === "" ? (
          <Text style={styles.information}>TBD</Text>
        ) : (
          <Text style={styles.information}>{location}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    display: "flex",
    alignItmes: "center",
    paddingTop: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 22,
  },
  chipContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  information: {
    fontSize: 20,
    marginTop: 10,
  },
  infoContainer: {
    padding: 25,
  },
});

export default TripScreen;
