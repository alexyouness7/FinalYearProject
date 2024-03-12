import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const CommentsScreen = () => {
  const navigation = useNavigation();

  // Sample data for comments
  const commentsData = [
    {
      id: '1',
      username: 'alexyouness',
      profileImage: require('../assets/details/images.jpeg'),
      comment: 'Wow, amazing!',
    },
    {
      id: '2',
      username: 'elie',
      profileImage: require('../assets/details/bb.jpeg'),
      comment: 'nice!',
    },
    {
      id: '3',
      username: 'sslsnds',
      profileImage: require('../assets/details/images.jpeg'),
      comment:
        'nice!khbfvkjedbnkjedbfkejbfkjwbfkjwbdkwjbdkjwbdwkjfbkjwbfwkjfbwjfbkwjfbbrhwwifiwjfiwjfwjifwjifwjfiwjijfi4983r3r 2rn2or2irni2r r2i',
    },
    {
      id: '4',
      username: 'sslsnds',
      profileImage: require('../assets/details/images.jpeg'),
      comment: 'nice!',
    },
  ];

  const renderCommentItem = ({item}) => (
    <View style={styles.commentContainer}>
      <Image source={item.profileImage} style={styles.profileImage} />
      <View style={styles.commentTextContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
      </View>
    </View>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Image
          source={require('../assets/vector.png')}
          style={styles.vectorImage}
        />
      </TouchableOpacity>

      <FlatList
        data={commentsData}
        keyExtractor={item => item.id}
        renderItem={renderCommentItem}
        contentContainerStyle={styles.commentsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: rh * 0.1, // Adjusted to be lower on the screen
  },
  commentsList: {
    paddingHorizontal: rw * 0.05,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh * 0.02,
  },
  profileImage: {
    width: rw * 0.15,
    height: rw * 0.15,
    borderRadius: rw * 0.075,
    marginRight: rw * 0.04,
  },
  commentTextContainer: {
    flex: 1,
  },
  username: {
    fontSize: rh * 0.02,
    fontWeight: 'bold',
    marginBottom: rh * 0.005,
  },
  commentText: {
    fontSize: rh * 0.018,
  },
  vectorImage: {
    width: rw * 0.06,
    height: rh * 0.03,
    margin: rw * 0.005, // Adjusted margin for top-left position
    top: rw * -0.08,
  },
});

export default CommentsScreen;
