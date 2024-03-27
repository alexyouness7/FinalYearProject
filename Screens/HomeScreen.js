import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const apikey = 'fbeec6b56cf31d56933b38590510da33';

  const upcomingMoviesAPI = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
  const popularMoviesAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
  const nowPlayingMoviesAPI = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);
  const [errorUpcoming, setErrorUpcoming] = useState(null);
  const [errorPopular, setErrorPopular] = useState(null);
  const [errorNowPlaying, setErrorNowPlaying] = useState(null);

  const fetchUpcomingMovies = async () => {
    try {
      const response = await fetch(upcomingMoviesAPI);
      const data = await response.json();
      setUpcomingMovies(data.results);
    } catch (error) {
      setErrorUpcoming('Error fetching upcoming movies.');
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(popularMoviesAPI);
      const data = await response.json();
      setPopularMovies(data.results);
    } catch (error) {
      setErrorPopular('Error fetching popular movies.');
    } finally {
      setLoadingPopular(false);
    }
  };

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await fetch(nowPlayingMoviesAPI);
      const data = await response.json();
      setNowPlayingMovies(data.results);
    } catch (error) {
      setErrorNowPlaying('Error fetching now playing movies.');
    } finally {
      setLoadingNowPlaying(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
    fetchPopularMovies();
    fetchNowPlayingMovies();
  }, []);

  const handlePressWonka = movieId => {
    navigation.navigate('DetailsScreen', {movieId: movieId});
  };

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  if (loadingUpcoming || loadingPopular || loadingNowPlaying) {
    return <Text>Loading...</Text>;
  }

  if (errorUpcoming || errorPopular || errorNowPlaying) {
    return <Text>{errorUpcoming || errorPopular || errorNowPlaying}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <FlatList
          data={nowPlayingMovies}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={handlePressWonka}
              style={styles.trendingMovieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.trendingMovieImage}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.title} paddingLeft={0.02 * rh}>
          Upcoming Movies
        </Text>
        <FlatList
          data={upcomingMovies}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={handlePressWonka}
              style={styles.movieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.title} paddingLeft={0.02 * rh}>
          Popular Movies
        </Text>
        <FlatList
          data={popularMovies}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={handlePressWonka}
              style={styles.movieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Rest of the FlatList sections for upcoming and popular movies */}
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
  trendingMovieContainer: {
    marginHorizontal: rw * 0.03,
    alignItems: 'center',
  },
  trendingMovieImage: {
    width: rw * 0.75,
    height: rh * 0.5,
    borderRadius: rw * 0.08,
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
  movieTitle: {
    marginTop: rh * 0.01,
  },
});

export default HomeScreen;
