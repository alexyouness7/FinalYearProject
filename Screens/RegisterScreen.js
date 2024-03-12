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
import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
//import {setDoc, doc} from 'firebase/firestore';
import {auth, db} from '../Firebase';
import {useNavigation} from '@react-navigation/native';
import LoginScreen from './LoginScreen';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const register = () => {
    if (email === '' || password === '' || phone === '') {
      Alert.alert(
        'Invalid Details',
        'Please enter all the credentials',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials._tokenResponse.email;
    //     const uid = auth.currentUser.uid;

    //     setDoc(doc(db, 'users', `${uid}`), {
    //       email: user,
    //       phone: phone,
    //     }).then(() => {
    //       console.log('User registered successfully');
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error creating user: ', error);
    //   });
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', padding: rh * 0.05}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{fontSize: rh * 0.02, marginBottom: rh * 0.02}}>Back</Text>
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
            <Text
              style={{
                fontSize: rh * 0.018,
                fontWeight: '600',
                color: 'grey',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={'black'}
              style={{
                fontSize: email ? rh * 0.017 : rh * 0.017,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                marginVertical: rh * 0.01,
                width: rw * 0.75,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </View>

          <View style={{marginTop: rh * 0.015}}>
            <Text
              style={{
                fontSize: rh * 0.018,
                fontWeight: '600',
                color: 'grey',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor={'black'}
              style={{
                fontSize: password ? rh * 0.017 : rh * 0.017,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                marginVertical: rh * 0.01,
                width: rw * 0.75,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </View>

          <View style={{marginTop: rh * 0.015}}>
            <Text
              style={{
                fontSize: rh * 0.018,
                fontWeight: '600',
                color: 'grey',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              Phone
            </Text>
            <TextInput
              value={phone}
              onChangeText={text => setPhone(text)}
              placeholder="Enter your phone number"
              placeholderTextColor={'black'}
              style={{
                fontSize: phone ? rh * 0.017 : rh * 0.017,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                marginVertical: rh * 0.01,
                width: rw * 0.75,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </View>
        </View>

        <Pressable
          onPress={register}
          style={{
            width: rw * 0.5,
            backgroundColor: '#003b96',
            padding: rh * 0.02,
            borderRadius: 7,
            marginTop: rh * 0.03,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: rh * 0.017,
              fontWeight: 'bold',
            }}>
            Register
          </Text>
        </Pressable>

        {/* <View style={{flexDirection: 'row'}}>
          <Text style={[styles.signupText, {marginLeft: rw * 0.05}]}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
            <Text
              style={[
                styles.signupText,
                {color: 'blue', textDecorationLine: 'underline'},
              ]}>
              {' '}
              Sign up
            </Text>
          </Pressable>
        </View> */}

        <View style={{flexDirection: 'row'}}>
          <Text style={[{marginLeft: rw * 0.05}]}>
            Already have an account ?
          </Text>
          <Pressable onPressIn={() => navigation.navigate(LoginScreen)}>
            <Text style={[{color: 'blue', textDecorationLine: 'underline'}]}>
              {' '}
              Sign In
            </Text>
          </Pressable>
        </View>

        {/* onPress={() => navigation.goBack()}
          style={{marginTop: rh * 0.015}}>
          <Text
            style={{textAlign: 'center', color: 'grey', fontSize: rh * 0.017}}>
            Already have an account? Sign in
          </Text> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
