import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {movieId} = route.params;
  console.log('Movie ID:', movieId);

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Fetch movie details using movieId and update movieDetails state
    fetchMovieDetails(movieId);
  }, [movieId]);

  console.log('Movie Details:', movieDetails);

  // Function to fetch movie details based on movieId
  const fetchMovieDetails = async movieId => {
    try {
      // Make API call to fetch movie details
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=fbeec6b56cf31d56933b38590510da33`,
      );
      const data = await response.json();
      // Update movieDetails state with fetched data
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // const movieDetailsAPI = id =>
  //   `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
  // const movieCastDetailsAPI = id =>
  //   `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;

  const [heartFilled, setHeartFilled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const movieData = {
    title: 'Wonka',
    image: require('../assets/home/wonka.webp'),
    genre: 'Fantasy',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id metus nec urna varius laoreet. Sed ac dolor id est ullamcorper efficitur non eget massa.',
    actors: [
      {
        id: 'actor1',
        name: 'Thimotee Chalamet',
        image: require('../assets/details/images.jpeg'),
      },
      {
        id: 'actor2',
        name: 'Rowan Atkinson',
        image: require('../assets/details/bb.jpeg'),
      },
      {
        id: 'actor3',
        name: 'Hugh Grant',
        image: require('../assets/details/ppp.webp'),
      },
    ],
  };

  const handleHeartPress = () => {
    setHeartFilled(!heartFilled);
  };

  const openReviewModal = () => {
    setModalVisible(true);
  };

  const closeReviewModal = () => {
    setModalVisible(false);
  };

  const submitReview = () => {
    // Handle the review submission logic
    console.log('Submitted Review:', reviewText);
    closeReviewModal();
  };

  const goToCommentsScreen = () => {
    // Navigate to CommentsScreen
    navigation.navigate('CommentsScreen'); // Make sure to replace 'CommentsScreen' with the actual name of your CommentsScreen component
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <ImageBackground
          source={
            movieDetails
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
                }
              : null
          }
          style={styles.coverImage}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/vector.png')}
              style={{
                width: rw * 0.06,
                height: rh * 0.03,
                marginTop: rh * 0.05,
                marginLeft: rw * 0.05,
              }}
            />
          </TouchableOpacity>
          <View
            style={{width: rw * 1.1, height: rh * 0.3, alignSelf: 'center'}}>
            <ImageBackground
              source={require('../assets/shadow.png')}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                marginTop: rh * 0.17,
              }}>
              <TouchableOpacity
                onPress={handleHeartPress}
                style={{
                  position: 'absolute',
                  bottom: rh * 0.02,
                  right: rw * 0.1,
                }}>
                <Image
                  source={
                    heartFilled
                      ? require('../assets/details/heartFilled.png')
                      : require('../assets/details/heart.png')
                  }
                  style={{
                    width: rw * 0.07,
                    height: rh * 0.03,
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{width: rw, height: rh * 0.001, backgroundColor: 'lightgrey'}}
      />
      <ScrollView style={{backgroundColor: 'black'}}>
        <Text style={styles.title}>
          {movieDetails ? movieDetails.original_title : ''}
        </Text>
        <Text style={styles.genre}>
          {movieDetails
            ? movieDetails.genres.map(genre => genre.name).join(', ')
            : ''}
        </Text>
        <Text style={styles.description}>
          {movieDetails ? movieDetails.overview : ''}
        </Text>

        {/* <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Actors</Text>
          {movieDetails && movieDetails.credits ? (
            <FlatList
              data={movieDetails.credits.cast}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.actorContainer}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                    }}
                    style={styles.actorImage}
                  />
                  <Text style={styles.actorName}>{item.name}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.actorName}>No actors available</Text>
          )}
        </View> */}

        {/* Reviews and Comments Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reviews and Comments</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={openReviewModal}>
              <Text style={styles.buttonText}>Add A Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={goToCommentsScreen}>
              <Text style={styles.buttonText}>View Comments</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Review Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeReviewModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalInput}
                multiline
                placeholder="Write your review..."
                value={reviewText}
                onChangeText={text => setReviewText(text)}
              />
              <View style={styles.modalButtonsContainer}>
                <Pressable
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={submitReview}>
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeReviewModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: rh * 0.01,
  },
  button: {
    backgroundColor: '#992cc2',
    padding: rh * 0.01,
    borderRadius: rh * 0.01,
  },
  buttonText: {
    color: 'white',
  },
  coverImage: {
    width: '100%',
    height: rh * 0.55,
    resizeMode: 'cover',
    position: 'relative', // Needed for positioning absolute elements
  },
  title: {
    fontSize: rh * 0.04,
    fontWeight: 'bold',
    marginVertical: rh * 0.015,
    textAlign: 'center',
    // backgroundColor: 'lightgrey',
    width: rw,
    height: rh * 0.05,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    color: 'white',
  },
  genre: {
    fontSize: rh * 0.025,
    color: 'gray',
    textAlign: 'center',
  },
  description: {
    fontSize: rh * 0.02,
    margin: rh * 0.015,
    textAlign: 'center',
    color: 'white',
  },
  sectionContainer: {
    marginHorizontal: rw * 0.03,
    marginBottom: rh * 0.015,
  },
  sectionTitle: {
    fontSize: rh * 0.03,
    fontWeight: 'bold',
    marginBottom: rh * 0.015,
    color: 'white',
  },
  actorContainer: {
    margin: rh * 0.01,
    alignItems: 'center',
  },
  actorImage: {
    width: rw * 0.4,
    height: rh * 0.2,
    borderRadius: rh * 0.02,
    marginBottom: rh * 0.01,
  },
  actorName: {
    fontSize: rh * 0.015,
    textAlign: 'center',
    color: 'white',
  },
  backButton: {
    padding: rh * 0.015,
    backgroundColor: '#add8e6',
    alignItems: 'center',
    position: 'absolute',
    bottom: -0.1 * rh,
    left: 0,
    width: '100%',
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: rw * 0.05,
    borderRadius: rw * 0.02,
    width: rw * 0.8,
    maxHeight: '80%',
  },
  modalInput: {
    height: rh * 0.3,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: rh * 0.02,
    padding: rw * 0.02,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    padding: rh * 0.015,
    borderRadius: rh * 0.01,
  },
  submitButton: {
    backgroundColor: 'blue',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default DetailsScreen;
