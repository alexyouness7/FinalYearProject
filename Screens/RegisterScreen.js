import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNb, setPhoneNb] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  // const register = async () => {
  //   if (email === '' || password === '' || phoneNb === '' || username === '') {
  //     // Alert the user if any field is empty
  //     Alert.alert(
  //       'Invalid Details',
  //       'Please enter all the credentials',
  //       [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //       {cancelable: false},
  //     );
  //     return;
  //   }

  //   try {
  //     const userCredential = await auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(console.log('User created successfully'));
  //     const user = userCredential.user;
  //     const uid = user.uid;
  //     await firestore()
  //       .collection('users')
  //       .doc(uid)
  //       .set({
  //         email,
  //         phoneNb,
  //         username,
  //       })
  //       .then(() => {
  //         console.log('User data saved to Firestore!');
  //         // Navigate to the Tabs screen upon successful registration
  //         navigation.navigate('Tabs');
  //         // Show a success message to the user
  //         Alert.alert('Registration Successful', 'Welcome to our app!');
  //       })
  //       .catch(error => {
  //         console.error('Error saving user data to Firestore: ', error);
  //         // Handle Firestore save error
  //         Alert.alert('Error', 'An error occurred. Please try again later.');
  //       });
  //   } catch (error) {
  //     if (error.code === 'auth/email-already-in-use') {
  //       // Alert the user if the email is already in use
  //       Alert.alert(
  //         'Email already in use',
  //         'Please use a different email address.',
  //       );
  //     } else {
  //       // Alert the user if there's an error creating the account
  //       Alert.alert(
  //         'Error',
  //         'An error occurred while creating the account. Please try again later.',
  //       );
  //     }
  //     // console.error('Error creating user: ', error);
  //   }
  // };

  const register = async () => {
    let uid;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('userCredential: ', userCredential);
      const user = userCredential.user;
      console.log('user', user);
      uid = user.uid;
      console.log('uid', user.uid);

      await firestore().collection('users').doc(uid).set({
        email,
        phoneNb,
        username,
      });

      console.log('User Created and Firestore Document created successfully.');
      console.log('Redirecting: ' + email + ' to Home Screen');
      navigation.navigate('Tabs'); // Replace 'Home' with the name of your desired screen
    } catch (error) {
      console.log('Error occurred: ', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email already in use');
      } else {
        Alert.alert('Error', 'An error occurred while creating the account.');
      }
    }
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', padding: rh * 0.05}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          style={{
            fontSize: rh * 0.02,
            marginLeft: rw * 0.06,
            marginTop: rh * 0.02,
          }}>
          Back
        </Text>
      </TouchableOpacity>

      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rh * 0.1,
          }}>
          <Text
            style={{color: '#003b96', fontSize: rh * 0.022, fontWeight: '700'}}>
            Sign Up
          </Text>
          <Text
            style={{
              marginTop: rh * 0.015,
              fontSize: rh * 0.025,
              fontWeight: '500',
            }}>
            Create an account
          </Text>
        </View>

        <View style={{marginTop: rh * 0.05}}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={'black'}
              style={styles.input}
            />
          </View>

          <View style={{marginTop: rh * 0.015}}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor={'black'}
              style={styles.input}
            />
          </View>

          <View style={{marginTop: rh * 0.015}}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              value={phoneNb}
              onChangeText={text => setPhoneNb(text)}
              placeholder="Enter your phone number"
              placeholderTextColor={'black'}
              style={styles.input}
            />
          </View>

          {/* Username field */}
          <View style={{marginTop: rh * 0.015}}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={text => setUsername(text)}
              placeholder="Enter your username"
              placeholderTextColor={'black'}
              style={styles.input}
            />
          </View>
        </View>

        <Pressable onPress={register} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            padding: rh * 0.02,
          }}>
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
              {' '}
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  label: {
    fontSize: rh * 0.018,
    fontWeight: '600',
    color: 'grey',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    fontSize: rh * 0.017,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: rh * 0.01,
    width: rw * 0.75,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  registerButton: {
    width: rw * 0.5,
    backgroundColor: '#003b96',
    padding: rh * 0.02,
    borderRadius: 7,
    marginTop: rh * 0.03,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  registerButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: rh * 0.017,
    fontWeight: 'bold',
  },
};

export default RegisterScreen;
