import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {searchMovies, baseImagePath} from '../src/apicalls';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const Screen2 = () => {
  const navigation = useNavigation();
  const [searchList, setSearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apikey = 'fbeec6b56cf31d56933b38590510da33';
  const nowPlayingMoviesAPI = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [errorNowPlaying, setErrorNowPlaying] = useState(null);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState(true);

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

  const searchMoviesFunction = async name => {
    try {
      if (name.trim() === '') {
        // If search term is empty, do nothing
        return;
      }
      const apikey = 'fbeec6b56cf31d56933b38590510da33';
      const searchMoviesAPI = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${name}`;
      const response = await fetch(searchMoviesAPI);
      const json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in SearchMoviesFunction', error);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handlePressWonka = movieId => {
    navigation.navigate('DetailsScreen', {movieId: movieId});
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search movies"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchMoviesFunction(searchTerm)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Now Playing Movies Section */}
      {searchTerm === '' ? (
        <View>
          <Text style={styles.sectionTitle}>Now Playing</Text>
          <FlatList
            data={nowPlayingMovies}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handlePressWonka(item.id)}
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
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <FlatList
            data={searchList}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.movieCard}
                onPress={() => {
                  handlePressWonka(item.id); // Call handlePressWonka function with movie id
                  navigation.push('MovieDetails', {movieid: item.id});
                }}>
                <Image
                  source={{uri: baseImagePath('w342', item.poster_path)}}
                  style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{item.original_title}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: rw * 0.03,
    paddingTop: rh * 0.05, // Adjusting padding top to avoid notch
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: rh * 0.02,
    alignItems: 'center', // Aligning items vertically
  },
  input: {
    flex: 1,
    height: rh * 0.06,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: rw * 0.03,
    marginRight: rw * 0.02,
    backgroundColor: '#f2f2f2', // Background color
  },
  searchButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: rh * 0.015,
  },
  buttonText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: rh * 0.025,
    fontWeight: 'bold',
    marginVertical: rh * 0.015,
  },
  flatListContent: {
    alignItems: 'center',
  },
  movieCard: {
    width: rw * 0.4,
    margin: rw * 0.02,
  },
  movieImage: {
    width: '100%',
    height: rh * 0.3,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: rh * 0.01,
    textAlign: 'center',
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
});

export default Screen2;
