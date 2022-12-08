import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AuthorRender = ({authorData}) => {
  return (
    <View style={styles.mr4} key={authorData.name}>
      <Text>Author: </Text>
      <View style={styles.authorWrapper}>
        {authorData.map((author, idx) => (
          <Text style={styles.fs12} key={author.name}>
            {author.name}
            {idx === authorData.length - 1 ? '' : ', '}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default AuthorRender;

const styles = StyleSheet.create({
  authorWrapper: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  fs12: {fontSize: 12},
  mr4: {marginTop: 4},
});
