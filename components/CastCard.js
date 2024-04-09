import * as React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const CastCard = props => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd ? styles.marginEnd : {},
        {maxWidth: props.cardWidth},
      ]}>
      <Image
        source={{uri: props.imagePath}}
        style={[styles.cardImage, {width: props.cardWidth}]}
      />
      <Text style={styles.title} numberOfLines={2}>
        {props.title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {props.subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: rw * 0.03,
    alignItems: 'center',
  },
  marginEnd: {
    marginRight: rw * 0.06,
  },
  cardImage: {
    aspectRatio: 1920 / 2880,
    borderRadius: rw * 0.025,
    height: rw * 0.28, // Adjust as needed
    marginBottom: 5, // Adjust as needed
  },
  title: {
    fontSize: rw * 0.032,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: rw * 0.025,
    textAlign: 'center',
    color: 'white',
  },
});

export default CastCard;
