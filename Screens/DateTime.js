import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const DateTime = ({route, navigation}) => {
  const {selectedDate} = route.params;

  // Format the selected date to display only day, month, and year
  const formattedDate = selectedDate ? selectedDate.toDateString() : '';

  // Array of hours
  const hours = ['2PM', '4PM', '6PM', '8PM', '10PM'];

  // State to keep track of the selected hour
  const [selectedHour, setSelectedHour] = useState('');

  // Function to handle button press
  const handleHourPress = hour => {
    setSelectedHour(hour);
  };

  // Function to render each hour button
  const renderHourButton = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.hourButton,
          selectedHour === item && {backgroundColor: 'yellow'},
        ]}
        onPress={() => handleHourPress(item)}
        activeOpacity={0.8}>
        <Text style={styles.hourText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.date}>{formattedDate}</Text>
      {/* Horizontal FlatList of hour buttons */}
      <FlatList
        horizontal
        data={hours}
        renderItem={renderHourButton}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: rw * 0.08, // Adjust font size using rw
    fontWeight: 'bold',
    marginTop: rh * 0.1,
  },
  backButton: {
    position: 'absolute',
    top: rh * 0.06,
    left: rw * 0.05,
    padding: 10,
  },
  flatListContainer: {
    marginTop: rh * 0.1, // Adjust margin top using rh
  },
  hourButton: {
    backgroundColor: '#eee',
    width: rw * 0.2, // Adjust width using rw
    height: rw * 0.2, // Adjust height using rw to make it square-shaped
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rw * 0.02,
    marginHorizontal: rw * 0.02,
  },
  hourText: {
    fontSize: rw * 0.04,
  },
});

export default DateTime;
