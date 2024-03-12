import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={require('../assets/home/wonka.webp')}
        style={styles.profileImage}
      />

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: rh * 0.05,
  },
  profileImage: {
    width: rw * 0.4,
    height: rw * 0.4,
    borderRadius: rw * 0.2,
    marginBottom: rh * 0.03,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: rh * 0.05,
  },
  userName: {
    fontSize: rh * 0.03,
    fontWeight: 'bold',
    marginBottom: rh * 0.01,
  },
  userEmail: {
    fontSize: rh * 0.02,
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#87CEEB', // Light Blue
    padding: rh * 0.015,
    borderRadius: rh * 0.01,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: rh * 0.02,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
