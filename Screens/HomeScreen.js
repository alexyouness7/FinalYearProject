import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const avatarMovies = [
  {key: '1', title: 'Avatar', image: require('../assets/home/avatar.jpg')},
  {key: '2', title: 'Avatar', image: require('../assets/home/avatar.jpg')},
  {key: '3', title: 'Avatar', image: require('../assets/home/avatar.jpg')},
];
const wonkaMovies = [
  {key: '1', title: 'Wonka', image: require('../assets/home/wonka.webp')},
  {key: '2', title: 'Wonka', image: require('../assets/home/wonka.webp')},
  {key: '3', title: 'Wonka', image: require('../assets/home/wonka.webp')},
];
const titanicMovies = [
  {key: '1', title: 'Titanic', image: require('../assets/home/titanic.jpg')},
  {key: '2', title: 'Titanic', image: require('../assets/home/titanic.jpg')},
  {key: '3', title: 'Titanic', image: require('../assets/home/titanic.jpg')},
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePressWonka = () => {
    navigation.navigate('DetailsScreen');
  };

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title} paddingLeft={0.02 * rh}>
          Trending Movies
        </Text>
        <TouchableOpacity onPress={handleDrawer}>
          <Text style={{marginTop: rh * 0.023, marginLeft: rw * 0.3}}>
            Toggle Drawer
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <FlatList
          data={avatarMovies}
          keyExtractor={item => item.key.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item, index}) => (
            <View style={styles.movieContainer}>
              <Image source={item.image} style={styles.avatarMovieImage} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
        />
        <Text style={styles.title} paddingLeft={0.02 * rh}>
          Screen 1
        </Text>
        <FlatList
          data={wonkaMovies}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={handlePressWonka}
              style={styles.movieContainer}>
              <Image source={item.image} style={styles.movieImage} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <Text
          style={[styles.title, {textAlign: 'left'}, {paddingLeft: 0.02 * rh}]}>
          Upcoming Movies
        </Text>
        <FlatList
          data={titanicMovies}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <Image source={item.image} style={styles.titanicMovieImage} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: rh * 0.025,
    fontWeight: 'bold',
    marginVertical: rh * 0.015,
  },
  flatListContent: {
    alignItems: 'center',
  },
  movieContainer: {
    marginHorizontal: rw * 0.03,
    alignItems: 'center',
  },
  movieImage: {
    width: rw * 0.42,
    height: rh * 0.25,
    borderRadius: rw * 0.02,
  },
  avatarMovieImage: {
    width: rw * 0.75,
    height: rh * 0.5,
    borderRadius: rw * 0.08,
  },
  titanicMovieImage: {
    width: rw * 0.42,
    height: rh * 0.25,
    borderRadius: rw * 0.06,
  },
  movieTitle: {
    marginTop: rh * 0.01,
  },
});

export default HomeScreen;
