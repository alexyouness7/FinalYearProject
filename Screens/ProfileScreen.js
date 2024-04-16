import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch the currently logged-in user's email
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const openGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(image => {
        setProfileImage(image.path);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Pressable onPress={openGallery}>
        <Image
          source={
            profileImage
              ? {uri: profileImage}
              : require('../assets/home/titanic.jpg')
          }
          style={styles.profileImage}
        />
      </Pressable>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Alex Younes</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>

        {/* Display user's email */}
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
    backgroundColor: '#87CEEB',
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
