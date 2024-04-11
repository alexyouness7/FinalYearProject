import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
//import {SafeAreaView} from 'react-native-safe-area-context';
//import {useNavigation} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const login = () => {
    console.log(email, password);
    if (email === '' || password === '') {
      Alert.alert(
        'Invalid Details',
        'Please enter your email and password',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User logged in successfully!');
        navigation.navigate('Tabs'); // Replace 'Home' with the name of your desired screen
      })
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          Alert.alert(
            'Invalid Credentials',
            'Please check your email and password.',
          );
        } else {
          Alert.alert(
            'Error',
            'An error occurred while logging in. Please try again later.',
          );
        }
        console.error('Error logging in: ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign In to your account</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.signInDetails}>Email</Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={'black'}
              style={styles.input}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.signInDetails}>Password</Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor={'black'}
              style={styles.input}
            />
          </View>
        </View>
        <Pressable onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <View style={{flexDirection: 'row'}}>
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    color: '#003b96',
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
  },
  form: {
    marginTop: 50,
  },
  signInDetails: {
    fontSize: 18,
    fontWeight: '600',
    color: 'grey',
  },
  input: {
    fontSize: 17,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  loginButton: {
    width: 200,
    backgroundColor: '#003b96',
    padding: 15,
    borderRadius: 7,
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'grey',
    fontSize: 17,
  },
});

export default LoginScreen;
