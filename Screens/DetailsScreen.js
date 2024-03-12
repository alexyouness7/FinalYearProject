import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const DetailsScreen = () => {
  const navigation = useNavigation();
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
        <ImageBackground source={movieData.image} style={styles.coverImage}>
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
          <TouchableOpacity
            onPress={handleHeartPress}
            style={{
              position: 'absolute',
              bottom: rh * 0.02,
              right: rw * 0.02,
            }}>
            <Image
              source={
                heartFilled
                  ? require('../assets/details/heartFilled.png')
                  : require('../assets/details/heart.png')
              }
              style={{
                width: rw * 0.06,
                height: rh * 0.03,
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <ScrollView style={{backgroundColor: 'black'}}>
        <Text style={styles.title}>{movieData.title}</Text>
        <Text style={styles.genre}>{movieData.genre}</Text>
        <Text style={styles.description}>{movieData.description}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Actors</Text>
          <FlatList
            data={movieData.actors}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.actorContainer}>
                <Image source={item.image} style={styles.actorImage} />
                <Text style={styles.actorName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* Reviews and Comments Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Reviews and Comments</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={openReviewModal}>
              <Text style={styles.buttonText}>Review</Text>
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
    marginTop: rh * 0.02,
  },
  button: {
    backgroundColor: 'blue',
    padding: rh * 0.01,
    borderRadius: rh * 0.01,
  },
  buttonText: {
    color: 'white',
  },
  coverImage: {
    width: '100%',
    height: rh * 0.4,
    resizeMode: 'cover',
    position: 'relative', // Needed for positioning absolute elements
  },
  title: {
    fontSize: rh * 0.04,
    fontWeight: 'bold',
    marginVertical: rh * 0.015,
    textAlign: 'center',
    // backgroundColor: 'lightgrey',
    width: rw * 0.5,
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
    width: rw*0.8,
    maxHeight: '80%',
  },
  modalInput: {
    height: rh*0.3,
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
