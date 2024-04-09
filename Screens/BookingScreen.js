import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const BookingScreen = ({route, navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const {movieDetails} = route.params;
    setMovieDetails(movieDetails);
  }, [route.params]);

  const onDateChange = date => {
    setSelectedDate(date);
    navigation.navigate('DateTime', {selectedDate: date});
  };

  return (
    <View style={styles.container}>
      {/* Use ImageBackground to set the background image */}
      <ImageBackground
        source={{uri: movieDetails?.coverImage}}
        style={styles.backgroundImage}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../assets/vector.png')}
            style={{
              width: rw * 0.06,
              height: rh * 0.03,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Select Date:</Text>
        <CalendarPicker
          width={rw * 0.8} // Adjust width using rw
          height={rh * 0.5} // Adjust height using rh
          startFromMonday={true} // Start week from Monday
          allowRangeSelection={false} // Disable range selection
          minDate={new Date()} // Minimum selectable date is today
          previousTitle=" " // Hide previous button
          onDateChange={onDateChange}
          selectedStartDate={selectedDate}
          selectedDayColor="blue"
          selectedDayTextColor="white" // Change text color for selected day
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: rh * 0.06,
    left: 0,
    padding: 10,
  },
});

export default BookingScreen;
