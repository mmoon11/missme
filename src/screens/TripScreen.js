import { StyleSheet, Text, View } from "react-native";
import { Chip, CheckBox, Icon, ButtonGroup } from "@rneui/themed";
import { Calendar } from "react-native-calendars";
import { useState, useEffect, useRef } from "react";
import { auth } from "../../util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../util/firebase";

const TripScreen = ({ route, navigation }) => {
  const { tripName, location, range, attending, tripID } = route.params;
  const [markedDates, setMarkedDates] = useState({});
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);
  const handleCheck = () => setChecked(!checked);

  const [rsvp, setRsvp] = useState(null);

  const getDate = (date) => {
    dateObject = date.toDate();
    month = (dateObject.getMonth() + 1).toString();
    day = dateObject.getDate().toString();
    year = dateObject.getFullYear().toString();
    return month + "/" + day + "/" + year;
  };

  const getCalendarDate = (date) => {
    dateObject = date.toDate();
    month = (dateObject.getMonth() + 1).toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    day = dateObject.getDate().toString();
    year = dateObject.getFullYear().toString();
    return year + "-" + month + "-" + day;
  };

  const getBetweenDays = (start, end) => {
    const betweenDays = [];
    start = start.toDate();
    end = end.toDate();
    end.setDate(end.getDate() - 1);

    while (
      start.getTime() < end.getTime() &&
      start.getDate() !== end.getDate()
    ) {
      start.setDate(start.getDate() + 1);

      betweenDays.push(start.toISOString().split("T")[0]);
    }

    return betweenDays;
  };

  useEffect(() => {
    if (range[0]) {
      const temp = {};
      const startDate = getCalendarDate(range[0]);
      const endDate = getCalendarDate(range[1]);

      const betweenDays = getBetweenDays(range[0], range[1]);

      const startStyle = {
        startingDay: true,
        color: "#26a69a",
        textColor: "white",
      };
      const middleStyle = {
        selected: true,
        color: "#26a69a",
        textColor: "white",
      };
      const endStyle = {
        endingDay: true,
        color: "#26a69a",
        textColor: "white",
      };

      temp[startDate] = startStyle;

      betweenDays.map((day) => {
        temp[day] = middleStyle;
      });

      temp[endDate] = endStyle;

      setMarkedDates(temp);
    } else {
      setMarkedDates(null);
    }
  }, [range]);

  // check if signedin
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  });

  // add to array according to answer
  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      const userRef = doc(db, "users", user.uid);
      if (rsvp === 1) {
        updateDoc(userRef, {
          attending: arrayUnion(tripID),
          notAttending: arrayRemove(tripID),
        });
      } else
        updateDoc(userRef, {
          notAttending: arrayUnion(tripID),
          attending: arrayRemove(tripID),
        });
    } else {
      notInitialRender.current = true;
    }
  }, [rsvp]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>{tripName}</Text>
      </View>
      {/* <View style={styles.chipContainer}>
        <Chip title={"Overview"} containerStyle={{ width: 100 }} />
        <Chip title={"Availability"} containerStyle={{ width: 100 }} />
      </View> */}
      <View style={[styles.infoContainer, { paddingTop: 25 }]}>
        <Text style={styles.subtitle}>Dates</Text>
        {range[0] === "-" ? (
          <Text style={styles.information}>TBD</Text>
        ) : (
          <Text style={styles.information}>
            {getDate(range[0])} - {getDate(range[1])}
          </Text>
        )}
      </View>

      <Calendar
        theme={{ calendarBackground: "transparent", textDisabledColor: "gray" }}
        style={{
          backgroundColor: "transparent",
          marginBottom: 20,
        }}
        markingType={"period"}
        markedDates={markedDates}
        enableSwipeMonths
        initialDate={getCalendarDate(range[0])}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>Location</Text>
        {location === "" ? (
          <Text style={styles.information}>TBD</Text>
        ) : (
          <Text style={styles.information}>{location}</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>People going:</Text>
        {attending.map((person) => (
          <View style={styles.person} key={person.name}>
            <View style={styles.profileContainer}>
              <Text style={styles.initials}>{person.initials}</Text>
            </View>
            <Text style={styles.nameText}>{person.name}</Text>
          </View>
        ))}
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
        checkedIcon={<Icon name="check-circle" type="feather" color="green" />}
        uncheckedIcon={<Icon name="circle" type="feather" />}
      /> */}
      {user ? (
        <View
          style={{
            position: "absolute",
            bottom: 40,
            right: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text>Going?</Text>
          <ButtonGroup
            buttons={["No", "Yes"]}
            selectedIndex={rsvp}
            onPress={(value) => {
              setRsvp(value);
            }}
            containerStyle={styles.buttonGroupContainer}
            selectedButtonStyle={
              rsvp === 0
                ? { backgroundColor: "red" }
                : { backgroundColor: "green" }
            }
          />
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 50,
            right: 50,
          }}
        >
          <Text style={{ fontSize: 16 }}>Sign in to RSVP</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    display: "flex",
    alignItmes: "center",
    marginTop: 55,
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
    paddingTop: 0,
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
  person: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  nameText: {
    fontSize: 16,
  },
  buttonGroupContainer: {
    borderRadius: 50,
    zIndex: 2,
    width: 200,
    backgroundColor: "transparent",
  },
  checkboxText: {
    fontWeight: "normal",
    color: "#000",
    fontSize: 16,
  },
});

export default TripScreen;
